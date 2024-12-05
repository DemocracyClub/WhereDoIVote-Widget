import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function StationNotFound(props) {
  return (
    <section className="StationNotFound" data-testid="station-not-found">
      <h1 className="eiw-header">
        <FormattedMessage
          id="station.not-found"
          description="We don't know where you should vote"
        />
      </h1>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
      {props.openingTimes && (
        <p>
          <FormattedMessage
            id="station.opening-hours"
            values={{
              start: props.openingTimes.start,
              end: props.openingTimes.end,
            }}
          />
        </p>
      )}
      <Notifications list={props.notifications} />
    </section>
  );
}

export default StationNotFound;
