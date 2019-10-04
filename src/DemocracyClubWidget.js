import React, { useState } from 'react';

import { EmbedCard, StartAgainButton, ErrorMessage, BuiltByDC, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';

import axios from 'axios';
import MockDCAPI from './test-utils/MockDCAPI';
import API from './api/DemocracyClubAPIHandler';

import translations from './translations/en';
import StationNotFound from './StationNotFound';
import NoUpcomingElection from './NoUpcomingElection';

function DemocracyClubWidget() {
    const api = new API(process.env.REACT_APP_MOCK ? new MockDCAPI() : axios);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentError, setCurrentError] = useState(undefined);
    const [station, setStation] = useState(undefined);
    const [stationNotFound, setStationNotFound] = useState(false);
    const [noUpcomingElection, setNoUpcomingElection] = useState(false);
    const [notifications, setNotifications] = useState(undefined);
    const [addressList, setAddressList] = useState(undefined);
    const [electoralServices, setElectoralServices] = useState(undefined);

    function resetWidget() {
        setSearchInitiated(false);
        setStation(undefined);
        setAddressList(undefined);
        setElectoralServices(undefined);
        setStationNotFound(false);
        setNoUpcomingElection(false);
        setCurrentError(undefined);
        setLoading(false);
    }

    function handleError(data) {
        setSearchInitiated(false);
        if (data.response !== undefined) {
            var err = data.response.data.message.replace(/.*: /g, '');
            if (data.response.status === 400) {
                if (err.startsWith('Postcode') && err.endsWith('is not valid.')) {
                    setCurrentError(err);
                } else if (err.startsWith('Could not') && err.endsWith('any source')) {
                    setCurrentError(translations['api.errors.voting-location-unknown']);
                } else {
                    setCurrentError(translations['api.errors.voting-location-unknown']);
                }
            } else {
                setCurrentError(translations['api.errors.voting-location-unknown']);
            }
        } else {
            setCurrentError(translations['api.errors.lookup-service-down']);
        }
        setLoading(false);
    }

    function handleResponse(resp) {
        setCurrentError(undefined);
        let nextBallotDate = resp.data.dates[0];
        let response = resp.data;
        if (nextBallotDate && nextBallotDate.notifications) {
            setNotifications(nextBallotDate.notifications);
        }

        if (response.electoral_services) {
            setElectoralServices(response.electoral_services);
        } else {
            setElectoralServices(false); // TODO handle
        }
        if (nextBallotDate && nextBallotDate.polling_station.polling_station_known) {
            setStation(api.toAddress(resp));
        } else if (
            nextBallotDate &&
            nextBallotDate.polling_station.polling_station_known === false
        ) {
            setStationNotFound(true);
        } else if (response.address_picker) {
            setAddressList(response.addresses);
        } else {
            setNoUpcomingElection(true);
        }
        setLoading(false);
    }

    function lookupGivenPostcode(postcode) {
        setLoading(true);
        api.getPollingStation(postcode)
            .then(handleResponse)
            .catch(handleError);
    }

    function lookupChosenAddress(value) {
        setLoading(true);
        api.getFromSelector(value)
            .then(handleResponse)
            .catch(handleError);
        setAddressList(undefined);
    }

    return (
        <EmbedCard className="DemocracyClubWidget">
            {currentError && (
                <ErrorMessage
                    currentError={currentError}
                    clearError={() => setCurrentError(false)}
                />
            )}
            {!searchInitiated && (
                <PostcodeSelector
                    lookupGivenPostcode={lookupGivenPostcode}
                    setSearchInitiated={setSearchInitiated}
                    setCurrentError={setCurrentError}
                />
            )}
            {loading && <Loader />}
            {station && <PollingStation station={station} notifications={notifications} />}
            {addressList && !station && (
                <AddressPicker
                    addressList={addressList}
                    lookupChosenAddress={lookupChosenAddress}
                />
            )}
            {stationNotFound && (
                <StationNotFound
                    notifications={notifications}
                    electoral_services={electoralServices}
                />
            )}
            {noUpcomingElection && (
                <NoUpcomingElection
                    notifications={notifications}
                    electoral_services={electoralServices}
                />
            )}
            {searchInitiated && <StartAgainButton onClick={resetWidget} />}
            <BuiltByDC />
        </EmbedCard>
    );
}

export default DemocracyClubWidget;
