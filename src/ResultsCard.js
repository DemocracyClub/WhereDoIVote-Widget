import React from 'react';

function ResultsCard(props) {
    let splitAddress = [];

    props.pollingStation.address.split(",")
        .forEach(function(line) {
            splitAddress.push(line);
            splitAddress.push(< br/>);
        });

    return (
        <div className="democracy_club_embed">
            <div className="card">
                <h2>Your polling station</h2>
                <div>
                    {splitAddress.slice(0, splitAddress.length - 1)}
                </div>
                { props.pollingStation.coordinates &&
                    <Directions origin={props.pollingStation.coordinates.origin} destination={props.pollingStation.coordinates.destination} />
                }
                <button href="#" onClick={props.home}>Back to postcode search</button>

                <div>
                    <a href="https://democracyclub.org.uk/" target="_top" className="dc_logo">
                    Built by <img alt="Democracy Club" src="https://candidates.democracyclub.org.uk/static/img/logo-with-text.png"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

function Directions(props) {
    return (
        <div id="directions">
            <br/>
            <a href={"https://maps.google.com/maps?q=" + props.destination} target="_top">
                Show me on Google Maps
            </a>
            { props.origin && " or " }
            { props.origin &&
                <a href={"https://www.openstreetmap.org/directions?engine=mapzen_foot&route=" + props.origin + ";" + props.destination} target="_top">
                    show me directions
                </a>
            }
        </div>
    );
}

export default ResultsCard;