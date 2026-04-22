import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { StartAgainButton, ErrorMessage, Loader } from './Branding';

import PostcodeSelector from './PostcodeSelector';
import PollingStation from './PollingStation';
import AddressPicker from './AddressPicker';
import Footer from './Footer';
import ShadowDomFactory from './ShadowDomFactory';

import { APIClientFactory } from './api/DemocracyClubAPIHandler';

import withTranslations from './withTranslations';
import withElections from './higher-order-components/withElections';

import PollingDate from './PollingDate';
import AdditionalFutureElections from './AdditionalFutureElections';
import StationNotFound from './StationNotFound';
import StationFound from './StationFound';
import { Notifications } from './Notifications';
import NoUpcomingElection from './NoUpcomingElection';
import WarningBanner from './WarningBanner';
import { AdvanceVotingStations, PollingDayVotingStations } from './MultipleStations';

import { formatPrimaryStationObject, formatAlternativeStationObject } from './utils';

import EC_styles from '!!raw-loader!./ec-widget-styles.css'; // eslint-disable-line
import DC_styles from '!!raw-loader!./dc-widget-styles.css'; // eslint-disable-line

const api = APIClientFactory();

function getOpeningTimes(ballots) {
  for (const ballot of ballots) {
    if (ballot.election_id.startsWith('local.city-of-london')) {
      return { start: 8, end: 8 };
    }
  }
  return { start: 7, end: 10 };
}

function getEcLink(postcode, uprn) {
  if (uprn && postcode) {
    return `https://www.electoralcommission.org.uk/polling-stations/address/${encodeURIComponent(
      postcode
    )}/${encodeURIComponent(uprn)}`;
  }
  if (postcode) {
    return `https://www.electoralcommission.org.uk/polling-stations?postcode-search=${encodeURIComponent(
      postcode
    )}`;
  }
  return 'https://www.electoralcommission.org.uk/i-am-a/voter/your-election-information';
}

function ElectionInformationWidget(props) {
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentError, setCurrentError] = useState(undefined);
  const [station, setStation] = useState(undefined);
  const [originPoint, setOriginPoint] = useState(undefined);
  const [stationNotFound, setStationNotFound] = useState(false);
  const [advanceVotingStations, setAdvanceVotingStations] = useState(undefined);
  const [pollingDayVotingStations, setPollingDayVotingStations] = useState(undefined);
  const [noUpcomingElection, setNoUpcomingElection] = useState(false);
  const [notifications, setNotifications] = useState(undefined);
  const [addressList, setAddressList] = useState(undefined);
  const [postcode, setPostcode] = useState(undefined);
  const [uprn, setUPRN] = useState(undefined);
  const [dates, setDates] = useState(undefined);
  const [electoralServices, setElectoralServices] = useState(undefined);
  const [openingTimes, setOpeningTimes] = useState(undefined);
  const [pollingDay, setPollingDay] = useState(undefined);
  const [accessibilityInformation, setAccessibilityInformation] = useState(undefined);
  const [showParishText, setShowParishText] = useState(true);
  const dataSource = process.env.REACT_APP_API;

  function resetWidget() {
    setSearchInitiated(false);
    setStation(undefined);
    setOriginPoint(undefined);
    setAddressList(undefined);
    setElectoralServices(undefined);
    setStationNotFound(false);
    setAdvanceVotingStations(undefined);
    setPollingDayVotingStations(undefined);
    setNoUpcomingElection(false);
    setNotifications(null);
    setCurrentError(undefined);
    setDates(undefined);
    setOpeningTimes(undefined);
    setPollingDay(undefined);
    setAccessibilityInformation(undefined);
    setShowParishText(true);
    setPostcode(undefined);
    setUPRN(undefined);
    setLoading(false);
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
    (resp) => {
      setCurrentError(undefined);
      let response = resp.data;
      let nextBallotDate = response.dates[0];
      props.enableElections && setDates(response.dates);

      if (nextBallotDate) {
        setPollingDay(nextBallotDate.date);
      }
      if (nextBallotDate && nextBallotDate.notifications) {
        if (props.enableElections) {
          /*
          Don't bother showing a notification for cancelled elections
          if we're showing individual ballots.
          We'll cover them in the CancelledBallot component.
          */
          setNotifications(
            nextBallotDate.notifications.filter(
              (notification) => notification.type !== 'cancelled_election'
            )
          );
        } else {
          setNotifications(nextBallotDate.notifications);
        }
      }
      if (response.electoral_services) {
        setElectoralServices(response.electoral_services);
      } else {
        setElectoralServices(false);
      }
      if (nextBallotDate && nextBallotDate.polling_station.polling_station_known) {
        setStation(formatPrimaryStationObject(nextBallotDate.polling_station.station));
      } else if (nextBallotDate && nextBallotDate.polling_station.polling_station_known === false) {
        setStationNotFound(true);
      } else if (response.address_picker) {
        setAddressList(response.addresses);
      } else {
        setNoUpcomingElection(true);
      }

      setOriginPoint(response?.postcode_location?.geometry?.coordinates);

      if (nextBallotDate && nextBallotDate.polling_station.polling_station_known) {
        const stations = (nextBallotDate.alternative_voting_stations ?? []).map(
          formatAlternativeStationObject
        );
        let pollingDayStations = [
          {
            ...formatPrimaryStationObject(nextBallotDate.polling_station.station),
            opening_times: [[nextBallotDate.date, '07:00:00', '22:00:00']],
          },
        ];
        if (Array.isArray(stations)) {
          const pollingDay = nextBallotDate.date;

          const advanceStations = stations.filter(
            (s) =>
              Array.isArray(s.opening_times) && s.opening_times.some((slot) => slot[0] < pollingDay)
          );
          setAdvanceVotingStations(advanceStations.length > 0 ? advanceStations : undefined);

          pollingDayStations = pollingDayStations.concat(
            stations.filter(
              (s) =>
                Array.isArray(s.opening_times) &&
                s.opening_times.some((slot) => slot[0] == pollingDay)
            )
          );
          setPollingDayVotingStations(
            pollingDayStations.length > 0 ? pollingDayStations : undefined
          );
        }
      } else if (nextBallotDate && nextBallotDate.polling_station.polling_station_known === false) {
        setStationNotFound(true);
      } else if (response.address_picker) {
        setAddressList(response.addresses);
      } else {
        setNoUpcomingElection(true);
      }

      if (nextBallotDate && nextBallotDate.ballots) {
        setOpeningTimes(getOpeningTimes(nextBallotDate.ballots));
      }

      if (
        nextBallotDate &&
        nextBallotDate.polling_station.polling_station_known &&
        nextBallotDate.polling_station.station.properties?.accessibility_information
      ) {
        setAccessibilityInformation(
          nextBallotDate.polling_station.station.properties.accessibility_information
        );
      }

      // Hide parish notifications for Northern Ireland and London
      if (
        response.electoral_services &&
        response.electoral_services.identifiers &&
        (response.electoral_services.postcode.startsWith('BT') ||
          response.electoral_services.identifiers.some((id) => id.startsWith('E09')))
      ) {
        setShowParishText(false);
      }

      setLoading(false);
    },
    [props.enableElections]
  );

  const lookupGivenPostcode = useCallback(
    (postcode) => {
      setLoading(true);
      setPostcode(postcode);
      setCurrentError(undefined);
      api.fetchByPostcode(postcode).then(handleResponse).catch(handleError);
    },
    [handleResponse]
  );

  function lookupChosenAddress(value) {
    setLoading(true);
    if (value === 'not-in-list') {
      setStationNotFound(true);
      setLoading(false);
    } else {
      api.fetch(value).then(handleResponse).catch(handleError);
    }
    setAddressList(undefined);
  }

  useEffect(() => {
    const el = document.getElementById('dc_wdiv');
    const initPostcode = el.getAttribute('data-postcode');

    if (initPostcode) {
      setSearchInitiated(true);
      lookupGivenPostcode(initPostcode);
    }
  }, [lookupGivenPostcode]);

  const ecLink = getEcLink(postcode, uprn);

  return (
    <ShadowDomFactory>
      {process.env.REACT_APP_BRAND === 'EC' ? (
        <style type="text/css">{EC_styles}</style>
      ) : (
        <style type="text/css">{DC_styles}</style>
      )}
      <WarningBanner dataSource={dataSource} />
      <div className="WidgetContainer">
        <section className="ElectionInformationWidget Card">
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
          {!addressList && dates && dates.length >= 1 && (
            <PollingDate
              single={true}
              date={dates[0]}
              postcode={postcode}
              showParishText={showParishText}
              ecLink={ecLink}
              {...props}
            />
          )}
          {notifications && <Notifications list={notifications} />}
          {addressList && !station && (
            <AddressPicker
              addressList={addressList}
              lookupChosenAddress={lookupChosenAddress}
              setUPRN={setUPRN}
              {...props}
            />
          )}

          {station && dates && (
            <p>
              {!advanceVotingStations &&
                (!pollingDayVotingStations || pollingDayVotingStations.length <= 1) && (
                  <FormattedMessage id="station.assigned-station" />
                )}{' '}
              <FormattedMessage id="station.no-poll-card" />
            </p>
          )}

          {station && <StationFound />}
          {advanceVotingStations && (
            <AdvanceVotingStations stations={advanceVotingStations} originPoint={originPoint} />
          )}
          {(pollingDayVotingStations && pollingDayVotingStations.length > 1 && (
            <PollingDayVotingStations
              stations={pollingDayVotingStations}
              originPoint={originPoint}
            />
          )) ||
            (station && (
              <PollingStation
                station={station}
                postcode={postcode}
                uprn={uprn}
                electoralServices={electoralServices}
                openingTimes={openingTimes}
                accessibilityInformation={accessibilityInformation}
                originPoint={originPoint}
                electionDate={pollingDay}
              />
            ))}
          {stationNotFound && (
            <StationNotFound
              electoral_services={electoralServices}
              openingTimes={openingTimes}
              electionDate={pollingDay}
            />
          )}
          {noUpcomingElection && <NoUpcomingElection electoral_services={electoralServices} />}
          {!addressList && dates && dates.length > 1 && (
            <>
              <hr />
              <AdditionalFutureElections
                dates={dates.slice(1)}
                postcode={postcode}
                ecLink={ecLink}
                {...props}
              />
            </>
          )}

          {searchInitiated && !loading && <StartAgainButton onClick={resetWidget} />}
          <Footer {...props} />
        </section>
      </div>
    </ShadowDomFactory>
  );
}

export default withElections(withTranslations(ElectionInformationWidget));
