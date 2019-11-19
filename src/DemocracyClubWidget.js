import React, { useState } from 'react';

import { StartAgainButton, ErrorMessage, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';
import Footer from './Footer';
import ShadowDomFactory from './ShadowDomFactory';

import { APIClientFactory } from './api/DemocracyClubAPIHandler';
import withTranslations from './withTranslations';
import withCandidates from './withCandidates';
import StationNotFound from './StationNotFound';
import NoUpcomingElection from './NoUpcomingElection';
import Candidates from './Candidates';

import styles from '!!raw-loader!./widget-styles.css'; // eslint-disable-line

function DemocracyClubWidget(props) {
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
    setNotifications(null);
    setCurrentError(undefined);
    setLoading(false);
    props.resetCandidates && props.resetCandidates();
  }

  function handleError(data) {
    setSearchInitiated(false);
    if (data.response !== undefined) {
      if (data.response.status === 400) {
        setCurrentError('api.errors.bad-postcode');
      } else {
        setCurrentError('api.errors.voting-location-unknown');
      }
    } else {
      setCurrentError('api.errors.generic-error');
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
    props.handleCandidates && props.handleCandidates(nextBallotDate);
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
      <section className="DemocracyClubWidget Card">
        {currentError && <ErrorMessage currentError={currentError} />}
        {!searchInitiated && (
          <PostcodeSelector
            lookupGivenPostcode={lookupGivenPostcode}
            setSearchInitiated={setSearchInitiated}
            setCurrentError={setCurrentError}
            {...props}
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
        {props.enableCandidates && props.candidates && <Candidates {...props} />}

        {searchInitiated && !loading && <StartAgainButton onClick={resetWidget} />}
        <Footer {...props} />
      </section>
    </ShadowDomFactory>
  );
}

export default withCandidates(withTranslations(DemocracyClubWidget));
