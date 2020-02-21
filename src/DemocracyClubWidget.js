import React, { useState, useEffect } from 'react';

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
import WarningBanner from './WarningBanner';
import Ballot from './Ballot';

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
  const [ballotDate, setBallotDate] = useState(undefined);
  const [addressList, setAddressList] = useState(undefined);
  const [postcode, setPostcode] = useState(undefined);
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
    props.resetBallot && props.resetBallot();
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
    console.log(response);
    if (nextBallotDate && nextBallotDate.notifications) {
      setNotifications(nextBallotDate.notifications);
    }

    if (nextBallotDate && nextBallotDate.date) {
      setBallotDate(nextBallotDate.date);
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
    setPostcode(postcode);
    setCurrentError(undefined);
    api
      .fetchByPostcode(postcode)
      .then(handleResponse)
      .catch(handleError);
  }

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
  }, []);

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

  let electionDate = new Date(ballotDate);
  let dayMonthYear = electionDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ShadowDomFactory>
      <WarningBanner dataSource={dataSource} />
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
        {props.ballots && (
          <>
            <h1 className="dc-header">{dayMonthYear}</h1>

            <p>
              Voters in <strong className="postcode">{postcode}</strong> will have{' '}
              {props.ballots.length} ballot paper{props.ballots.length > 1 ? 's' : null} to fill
              out:
            </p>

            <ul className="inline-list">
              {props.ballots.map((ballot, i) => (
                <Ballot key={`Ballot-${i}`} {...props} ballot={ballot} />
              ))}
            </ul>
            <p>There may also be parish, town or community council elections in some areas.</p>
          </>
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

export default withCandidates(withTranslations(DemocracyClubWidget));
