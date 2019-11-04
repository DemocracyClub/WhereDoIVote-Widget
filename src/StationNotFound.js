import React from 'react';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function StationNotFound(props) {
  return (
    <>
      <h1 className="dc-header">Station not found</h1>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
      <Notifications list={props.notifications} />
    </>
  );
}

export default StationNotFound;
