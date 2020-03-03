import React, { useState, useEffect, useCallback } from 'react';

import { StartAgainButton, ErrorMessage, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';
import Footer from './Footer';
import ShadowDomFactory from './ShadowDomFactory';

import { APIClientFactory } from './api/DemocracyClubAPIHandler';

import withTranslations from './withTranslations';
import withElections from './higher-order-components/withElections';

import Election from './Election';
import MultipleUpcomingElections from './MultipleUpcomingElections';
import StationNotFound from './StationNotFound';
import NoUpcomingElection from './NoUpcomingElection';
import WarningBanner from './WarningBanner';

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
  const [postcode, setPostcode] = useState(undefined);
  const [dates, setDates] = useState(undefined);
  const [electoralServices, setElectoralServices] = useState(undefined);
  const dataSource = process.env.REACT_APP_API;

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
    setDates(undefined);
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

  const handleResponse = useCallback(
    resp => {
      setCurrentError(undefined);
      let response = resp.data;
      let nextBallotDate = response.dates[0];
      props.enableElections && setDates(response.dates);

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
    },
    [api, props.enableElections]
  );

  const lookupGivenPostcode = useCallback(
    postcode => {
      setLoading(true);
      setPostcode(postcode);
      setCurrentError(undefined);
      api
        .fetchByPostcode(postcode)
        .then(handleResponse)
        .catch(handleError);
    },
    [api, handleResponse]
  );

  useEffect(() => {
    let paramPostcode = window.location.href.split('postcode=')[1]
      ? window.location.href.split('postcode=')[1].split('&')[0]
      : null;
    paramPostcode && lookupGivenPostcode(paramPostcode);
    paramPostcode && setSearchInitiated(true);
    if (!paramPostcode) {
      let localStoragePostcode = localStorage.getItem('dc_postcode');
      localStoragePostcode && lookupGivenPostcode(localStoragePostcode);
      localStoragePostcode && setSearchInitiated(true);
    }
  }, [lookupGivenPostcode]);

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
      <WarningBanner dataSource={dataSource} />
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
        {!addressList && dates && dates.length > 1 && (
          <MultipleUpcomingElections dates={dates} postcode={postcode} {...props} />
        )}
        {!addressList && dates && dates.length === 1 && (
          <Election single={true} election={dates[0]} postcode={postcode} {...props} />
        )}
        {station && <PollingStation station={station} notifications={notifications} />}
        {addressList && !station && (
          <AddressPicker
            addressList={addressList}
            lookupChosenAddress={lookupChosenAddress}
            {...props}
          />
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
        <Footer {...props} />
      </section>
    </ShadowDomFactory>
  );
}

export default withElections(withTranslations(DemocracyClubWidget));
