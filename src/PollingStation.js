import React from 'react';

import { IdRequirement } from './Notification';
import  { Directions } from './Directions';
function PollingStation(props) {
    let splitAddress = [];

    props.station.address.split(',').forEach(function(line, index) {
        splitAddress.push(line);
        splitAddress.push(<br key={index} />);
    });
    return (
        <section className="PollingStation">
            <IdRequirement metadata={props.metadata} /> 
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
