import React from 'react';

function Directions(props) {
    return (
        <div id="directions">
            <br/>
            <GoogleMaps destination={props.destination} />
            { props.origin && <span> or </span> }
            { props.origin && <OpenStreetMap origin={props.origin} destination={props.destination} /> }
        </div>
    );
}

function GoogleMaps(props) {
    return <a href={"https://maps.google.com/maps?q=" + props.destination} target="_top">
               Show me on Google Maps
           </a>
}

function OpenStreetMap(props) {
    return <a href={"https://www.openstreetmap.org/directions?engine=mapzen_foot&route=" + props.origin + ";" + props.destination} target="_top">
               show me directions
           </a>
}

export { Directions, GoogleMaps, OpenStreetMap };