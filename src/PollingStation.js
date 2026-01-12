import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Accessibility } from './Accessibility';
import { Notifications } from './Notifications';
import { Directions } from './Directions';

function PollingStation(props) {
  let splitAddress = [];

  props.station.address.split(',').forEach(function (line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });
  return (
    <section className="PollingStation" data-testid="station-found">
      <h3 className="eiw-secondary-header">
        <FormattedMessage id="station.your-station" description="Vote on Polling Day" />
      </h3>
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

      {props.station.coordinates && (
        <Directions
          origin={props.station.coordinates.origin}
          destination={props.station.coordinates.destination}
        />
      )}
      {props.accessibilityInformation && <Accessibility {...props.accessibilityInformation} />}

      <Notifications list={props.notifications} />
    </section>
  );
}

export default PollingStation;
