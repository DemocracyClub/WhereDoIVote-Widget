import React from 'react';

import { Notifications } from './Notifications';
import { Directions } from './Directions';
import translations from './translations/en';

function PollingStation(props) {
  let splitAddress = [];

  props.station.address.split(',').forEach(function(line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });
  return (
    <article className="PollingStation">
      <h1 className="dc-header">{translations['station.your-station']}</h1>
      <div className="address">{splitAddress.slice(0, splitAddress.length - 1)}</div>
      {props.station.coordinates && (
        <Directions
          origin={props.station.coordinates.origin}
          destination={props.station.coordinates.destination}
        />
      )}
      <Notifications list={props.notifications} />
    </article>
  );
}

export default PollingStation;
