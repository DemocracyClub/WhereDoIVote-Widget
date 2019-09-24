import React from 'react';

import Notification from './Notification';
import  { Directions } from './Directions';
function PollingStation(props) {
    let splitAddress = [];

    props.station.address.split(',').forEach(function(line, index) {
        splitAddress.push(line);
        splitAddress.push(<br key={index} />);
    });
    return (
        <section className="PollingStation">
            {props.metadata && props.metadata['voter_id'] && (
                <Notification
                    title={props.metadata['voter_id'].title}
                    url={props.metadata['voter_id'].url}
                />
            )}
            <h2>Your polling station</h2>
            <div>{splitAddress.slice(0, splitAddress.length - 1)}</div>
            {props.station.coordinates && (
                <Directions
                    origin={props.station.coordinates.origin}
                    destination={props.station.coordinates.destination}
                />
            )}
        </section>
    );
}

export default PollingStation;
