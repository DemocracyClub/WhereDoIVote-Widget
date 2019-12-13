import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function StationNotFound(props) {
  return (
    <div className="StationNotFound" data-testid="station-not-found">
      <h1 className="dc-header">
        <FormattedMessage
          id="station.not-found"
          description="We don't know where you should vote"
        />
      </h1>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
      <p>
        <FormattedMessage
          id="station.opening-hours"
          description="Polling stations are open from 7am to 10pm on polling day"
        />
      </p>
      <Notifications list={props.notifications} />
    </div>
  );
}

export default StationNotFound;
