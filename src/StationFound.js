import React from 'react';
import { FormattedMessage } from 'react-intl';

function StationFound() {
  return (
    <h1 className="eiw-header">
      <FormattedMessage id="station.found" description="Where to vote" />
    </h1>
  );
}

export default StationFound;
