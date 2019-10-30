import React, { useState } from 'react';

import { StartAgainButton, ErrorMessage, BuiltByDC, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';

import ShadowDomFactory from './ShadowDomFactory';

import { APIClientFactory } from './api/DemocracyClubAPIHandler';

import translations from './translations/en';
import StationNotFound from './StationNotFound';
import NoUpcomingElection from './NoUpcomingElection';

import styles from '!!raw-loader!./widget-styles.css'; // eslint-disable-line

function DemocracyClubWidget() {
  const api = APIClientFactory();
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
      if (data.response.status === 400) {
        setCurrentError(translations['api.errors.bad-postcode']);
      } else {
        setCurrentError(translations['api.errors.voting-location-unknown']);
      }
    } else {
      setCurrentError(translations['api.errors.generic-error']);
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
      setElectoralServices(false);
    }
    if (nextBallotDate && nextBallotDate.polling_station.polling_station_known) {
      setStation(api.toAddress(resp));
    } else if (nextBallotDate && nextBallotDate.polling_station.polling_station_known === false) {
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
    setCurrentError(undefined);
    api
      .fetchByPostcode(postcode)
      .then(handleResponse)
      .catch(handleError);
  }

  function lookupChosenAddress(value) {
    setLoading(true);
    if (value === 'not-in-list') {
      setStationNotFound(true);
      setLoading(false);
    } else {
      api
        .fetch(value)
        .then(handleResponse)
        .catch(handleError);
    }
    setAddressList(undefined);
  }

  return (
    <ShadowDomFactory>
      <style type="text/css">{styles}</style>
      <main className="DemocracyClubWidget Card">
        {currentError && <ErrorMessage currentError={currentError} />}
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
          <AddressPicker addressList={addressList} lookupChosenAddress={lookupChosenAddress} />
        )}
        {stationNotFound && (
          <StationNotFound notifications={notifications} electoral_services={electoralServices} />
        )}
        {noUpcomingElection && (
          <NoUpcomingElection
            notifications={notifications}
            electoral_services={electoralServices}
          />
        )}

        {searchInitiated && !loading && <StartAgainButton onClick={resetWidget} />}
        <BuiltByDC />
      </main>
    </ShadowDomFactory>
  );
}

export default DemocracyClubWidget;
