import React from 'react';
import { Notifications } from './Notifications';
import { FormattedMessage } from 'react-intl';

function NoUpcomingElection(props) {
  return (
    <article className="NoUpcomingElection">
      <h1 className="dc-header">
        <FormattedMessage
          id="elections.unknown"
          description="We don't know of any upcoming elections in your area"
        />
      </h1>
      <Notifications list={props.notifications} />
    </article>
  );
}

export default NoUpcomingElection;
