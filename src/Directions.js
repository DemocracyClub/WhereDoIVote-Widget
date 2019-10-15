import React from 'react';

function Directions(props) {
  var gmaps_link;
  if (props.origin) {
    gmaps_link = <GoogleDirections origin={props.origin} destination={props.destination} />;
  } else {
    gmaps_link = <GoogleMaps destination={props.destination} />;
  }

  return (
    <div id="directions">
      <br />
      {gmaps_link}
    </div>
  );
}

function GoogleMaps(props) {
  return (
    <a href={'https://maps.google.com/maps?q=' + props.destination} target="_top">
      Show me on Google Maps
    </a>
  );
}

function GoogleDirections(props) {
  return (
    <a
      href={'https://maps.google.com/maps/dir/' + props.origin + '/' + props.destination}
      target="_top"
    >
      Show me directions
    </a>
  );
}

export { Directions, GoogleMaps, GoogleDirections };
