import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import { Directions } from './Directions';

function PollingStation(props) {
  let splitAddress = [];

  props.station.address.split(',').forEach(function (line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });
  return (
    <section className="PollingStation">
      <h2 className="eiw-secondary-header">
        <FormattedMessage id="station.your-station" description="Vote on Polling Day" />
      </h2>
      <address data-testid="address" className="address">
        <p>{splitAddress.slice(0, splitAddress.length - 1)}</p>
      </address>
      <p>
        <FormattedMessage
          id="station.opening-hours"
          description="Polling stations are open from 7am to 10pm on polling day."
        />
      </p>
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
