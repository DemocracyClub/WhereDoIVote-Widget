import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function StationNotFound(props) {
  return (
    <div data-testid="station-not-found">
      <h1 className="dc-header">
        <FormattedMessage id="station.not-found" description="Station not found" />
      </h1>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
      <Notifications list={props.notifications} />
    </div>
  );
}

export default StationNotFound;
