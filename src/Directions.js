import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

function pointForGmaps(coordinates) {
  // convert an array [lon, lat] to a string "lat,lon"
  return coordinates[1] + ',' + coordinates[0];
}

function Directions(props) {
  var gmaps_link;
  if (props.origin) {
    gmaps_link = (
      <GoogleDirections
        origin={pointForGmaps(props.origin)}
        destination={pointForGmaps(props.destination)}
      />
    );
  } else {
    gmaps_link = <GoogleMaps destination={pointForGmaps(props.destination)} />;
  }

  return <section className="directions">{gmaps_link}</section>;
}

function GoogleMapsTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <p>
      <a
        href={'https://maps.google.com/maps?q=' + props.destination}
        target="_top"
        data-testid="google-maps"
        title={formatMessage({ id: 'directions.show-google-maps-title' })}
      >
        <FormattedMessage id="directions.show-google-maps" description="Show me on Google Maps" />
      </a>
    </p>
  );
}

const GoogleMaps = injectIntl(GoogleMapsTemplate);

function GoogleDirectionsTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <p>
      <a
        href={'https://maps.google.com/maps/dir/' + props.origin + '/' + props.destination}
        target="_top"
        data-testid="google-directions"
        title={formatMessage({ id: 'directions.show-google-directions-title' })}
      >
        <FormattedMessage id="directions.show-google-directions" description="Show me directions" />
      </a>
    </p>
  );
}

const GoogleDirections = injectIntl(GoogleDirectionsTemplate);

export { Directions, GoogleMaps, GoogleDirections };
