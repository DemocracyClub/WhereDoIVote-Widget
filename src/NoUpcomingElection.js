import React from 'react';
import { Notifications } from './Notifications';

function NoUpcomingElection(props) {
  return (
    <div className="NoUpcomingElection">
      <Notifications list={props.notifications} />
      <h2 id="dc_header">{"We don't know of any upcoming elections in your area"}</h2>
    </div>
  );
}

export default NoUpcomingElection;
