import React from 'react';
import { FormattedMessage } from 'react-intl';

function StationFound() {
  return (
    <h2 className="eiw-header">
      <FormattedMessage id="station.found" description="Where to vote" />
    </h2>
  );
}

export default StationFound;
