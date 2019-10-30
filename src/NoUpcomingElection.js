import React from 'react';
import { Notifications } from './Notifications';

function NoUpcomingElection(props) {
  return (
    <section className="NoUpcomingElection">
      <h1 className="dc-header">{"We don't know of any upcoming elections in your area"}</h1>
      <Notifications list={props.notifications} />
    </section>
  );
}

export default NoUpcomingElection;
