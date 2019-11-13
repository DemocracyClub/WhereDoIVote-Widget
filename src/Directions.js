import React from 'react';

function Directions(props) {
  var gmaps_link;
  if (props.origin) {
    gmaps_link = <GoogleDirections origin={props.origin} destination={props.destination} />;
  } else {
    gmaps_link = <GoogleMaps destination={props.destination} />;
  }

  return <section className="directions">{gmaps_link}</section>;
}

function GoogleMaps(props) {
  return (
    <a
      href={'https://maps.google.com/maps?q=' + props.destination}
      target="_top"
      title="View polling station on Google Maps"
    >
      Show me on Google Maps
    </a>
  );
}

function GoogleDirections(props) {
  return (
    <a
      href={'https://maps.google.com/maps/dir/' + props.origin + '/' + props.destination}
      target="_top"
      className="dc-btn-primary"
      title="View directions to polling station from your postcode on Google Maps"
    >
      Show me directions
    </a>
  );
}

export { Directions, GoogleMaps, GoogleDirections };
