import React from 'react';

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

export default Directions;