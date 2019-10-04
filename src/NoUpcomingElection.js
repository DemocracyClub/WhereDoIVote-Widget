import React from 'react';
import { Notifications } from './Notifications';
import ElectoralServices from './ElectoralServices';

function NoUpcomingElection(props) {
    return (
        <>
            <Notifications list={props.notifications} />
            <h2 id="dc_header">No upcoming election</h2>
            {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
        </>
    );
}

export default NoUpcomingElection;
