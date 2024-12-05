import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import { Directions } from './Directions';

function PollingStation(props) {
  let splitAddress = [];
  var wdiv_link;
  if (props.uprn) {
    wdiv_link = `https://wheredoivote.co.uk/address/${props.uprn}/`;
  } else {
    wdiv_link = `https://wheredoivote.co.uk/postcode/${props.postcode}/`;
  }
  var show_i18n_link = false;
  const i18n_councils = ['CGN', 'CMN', 'COV', 'CRF', 'NTL', 'NWP', 'STY', 'VGL', 'WAE'];
  if (i18n_councils.indexOf(props.electoralServices.council_id) > -1) {
    show_i18n_link = true;
  }

  props.station.address.split(',').forEach(function (line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });
  return (
    <section className="PollingStation" data-testid="station-found">
      <h2 className="eiw-secondary-header">
        <FormattedMessage id="station.your-station" description="Vote on Polling Day" />
      </h2>
      <address data-testid="address" className="address">
        <p>{splitAddress.slice(0, splitAddress.length - 1)}</p>
      </address>
      {props.openingTimes && (
        <p>
          <FormattedMessage
            id="station.opening-hours"
            values={{
              start: props.openingTimes.start,
              end: props.openingTimes.end,
            }}
          />
        </p>
      )}
      {show_i18n_link && (
        <p>
          For detailed information on accessibility, see <a href={wdiv_link}>WhereDoIVote.co.uk</a>
        </p>
      )}

      {props.station.coordinates && (
        <Directions
          origin={props.station.coordinates.origin}
          destination={props.station.coordinates.destination}
        />
      )}

      <Notifications list={props.notifications} />
    </section>
  );
}

export default PollingStation;
