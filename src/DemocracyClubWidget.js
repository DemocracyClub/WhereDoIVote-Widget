import React, { useState } from 'react';

import { EmbedCard, StartAgainButton, ErrorMessage, BuiltByDC, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';

import * as axios from 'axios';
import API from './api/DemocracyClubAPIHandler';

import translations from './translations/en';
import StationNotFound from './StationNotFound';

function DemocracyClubWidget() {
    const api = new API(axios);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentError, setCurrentError] = useState(undefined);
    const [station, setStation] = useState(undefined);
    const [stationNotFound, setStationNotFound] = useState(false);
    const [metadata, setMetadata] = useState(undefined);
    const [addressList, setAddressList] = useState(undefined);
    const [electoralServices, setElectoralServices] = useState(undefined);

    function resetWidget() {
        setSearchInitiated(false);
        setStation(undefined);
        setAddressList(undefined);
        setElectoralServices(undefined);
        setStationNotFound(false);
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
                    setCurrentError('Could not geocode from any source');
                } else {
                    setCurrentError(translations['api.errors.voting-location-unknown']);
                }
            } else {
                setCurrentError(translations['api.errors.voting-location-unknown']);
            }
        } else {
            setCurrentError(translations['api.errors.lookup-service-down']);
        }
    }

    function handleResponse(resp) {
        setCurrentError(undefined);

        let nextElection = resp.data.dates[0];
        let response = resp.data;

        if (response.metadata) {
            setMetadata(response.metadata);
        }

        if (response.electoral_services) {
            setElectoralServices(response.electoral_services);
        } else {
            setElectoralServices(false); // TODO handle
        }
        if (nextElection && nextElection.polling_station.polling_station_known) {
            setStation(api.toAddress(resp));
        } else if (nextElection && nextElection.polling_station.polling_station_known === false) {
            setStationNotFound(true);
        } else if (response.address_picker) {
            setAddressList(response.addresses);
        } else {
            setCurrentError(translations['api.errors.unknown-error']);
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
            {station && <PollingStation station={station} />}
            {addressList && !station && (
                <AddressPicker
                    addressList={addressList}
                    lookupChosenAddress={lookupChosenAddress}
                />
            )}
            {stationNotFound && (
                <StationNotFound metadata={metadata} electoral_services={electoralServices} />
            )}
            {searchInitiated && <StartAgainButton onClick={resetWidget} />}
            <BuiltByDC />
        </EmbedCard>
    );
}

export default DemocracyClubWidget;
