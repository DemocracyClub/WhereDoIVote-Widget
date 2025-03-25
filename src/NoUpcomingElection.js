import React from 'react';
import { Notifications } from './Notifications';
import { FormattedMessage } from 'react-intl';

function NoUpcomingElection(props) {
  return (
    <div className="NoUpcomingElection">
      <h2 className="eiw-header">
        <FormattedMessage
          id="elections.unknown"
          description="We don't know of any upcoming elections in your area"
        />
      </h2>
      <Notifications list={props.notifications} />
    </div>
  );
}

export default NoUpcomingElection;
