import React from 'react';
import { Directions } from './Directions';
import { EmbedCard, BuiltByDC } from './Branding';
import { Notification } from './Notification';

function ResultsCard(props) {
    let splitAddress = [];

    props.pollingStation.address.split(",")
        .forEach(function(line, index) {
            splitAddress.push(line);
            splitAddress.push(<br key={index}/>);
        });

    return (
            <EmbedCard>
                { props.metadata && ('2018-05-03-id-pilot' in props.metadata) &&
                  <Notification
                    title={props.metadata['2018-05-03-id-pilot'].title}
                    url={props.metadata['2018-05-03-id-pilot'].url}
                  />
                }
                <h2>Your polling station</h2>
                <div>
                    {splitAddress.slice(0, splitAddress.length - 1)}
                </div>
                { props.pollingStation.coordinates &&
                    <Directions origin={props.pollingStation.coordinates.origin} destination={props.pollingStation.coordinates.destination} />
                }
                <button href="#" onClick={props.home}>Back to postcode search</button>

                <BuiltByDC/>
            </EmbedCard>
    );
}

export default ResultsCard;