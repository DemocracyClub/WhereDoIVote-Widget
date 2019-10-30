import React from 'react';

import { Notifications } from './Notifications';
import { Directions } from './Directions';

function PollingStation(props) {
  let splitAddress = [];

  props.station.address.split(',').forEach(function(line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });
  return (
    <section className="PollingStation">
      <h1 className="dc-header">Your polling station</h1>
      <div className="address">{splitAddress.slice(0, splitAddress.length - 1)}</div>
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
