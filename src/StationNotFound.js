import React from 'react';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function StationNotFound(props) {
  return (
    <>
      <Notifications list={props.notifications} />
      <h2 className="dc-header">We couldn&#39;t find your station</h2>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
    </>
  );
}

export default StationNotFound;
