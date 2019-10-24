import React from 'react';
import { Notifications } from './Notifications';

function NoUpcomingElection(props) {
  return (
    <section className="NoUpcomingElection">
      <Notifications list={props.notifications} />
      <h2 className="dc-header">{"We don't know of any upcoming elections in your area"}</h2>
    </section>
  );
}

export default NoUpcomingElection;
