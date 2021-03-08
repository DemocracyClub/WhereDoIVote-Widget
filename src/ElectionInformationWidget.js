import React, { useState, useCallback } from 'react';

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
import NoUpcomingElection from './NoUpcomingElection';
import WarningBanner from './WarningBanner';

import EC_styles from '!!raw-loader!./ec-widget-styles.css'; // eslint-disable-line
import DC_styles from '!!raw-loader!./dc-widget-styles.css'; // eslint-disable-line

function ElectionInformationWidget(props) {
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
    (resp) => {
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
    (postcode) => {
      setLoading(true);
      setPostcode(postcode);
      setCurrentError(undefined);
      api.fetchByPostcode(postcode).then(handleResponse).catch(handleError);
    },
    [api, handleResponse]
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

  function handleStyles() {
    if (process.env.REACT_APP_BRAND === 'EC') {
      return <style type="text/css">{EC_styles}</style>;
    } else {
      return <style type="text/css">{DC_styles}</style>;
    }
  }
  return (
    <ShadowDomFactory>
      {handleStyles()}
      <WarningBanner dataSource={dataSource} />
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
          <PollingDate single={true} date={dates[0]} postcode={postcode} {...props} />
        )}
        {addressList && !station && (
          <AddressPicker
            addressList={addressList}
            lookupChosenAddress={lookupChosenAddress}
            {...props}
          />
        )}
        {station && <PollingStation station={station} notifications={notifications} />}
        {stationNotFound && (
          <StationNotFound notifications={notifications} electoral_services={electoralServices} />
        )}
        {noUpcomingElection && (
          <NoUpcomingElection
            notifications={notifications}
            electoral_services={electoralServices}
          />
        )}
        {!addressList && dates && dates.length > 1 && (
          <>
            <hr />
            <AdditionalFutureElections dates={dates.slice(1)} postcode={postcode} {...props} />
          </>
        )}

        {searchInitiated && !loading && <StartAgainButton onClick={resetWidget} />}
        <Footer {...props} />
      </section>
    </ShadowDomFactory>
  );
}

export default withElections(withTranslations(ElectionInformationWidget));
