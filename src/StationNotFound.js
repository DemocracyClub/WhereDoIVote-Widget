import React from 'react';
import { IdRequirement } from './Notification';

function StationNotFound(props) {
    return (
        <>
            { props.metadata && <IdRequirement metadata={props.metadata} />  }
            <h2 id="dc_header">We couldn't find your station</h2>
            {props.electoral_services && (
                <div>
                    <span id="dc_get_in_touch">
                        Get in touch with{' '}
                        <b>
                            {props.electoral_services.council_id.startsWith('N09')
                                ? 'The Electoral Office for Northern Ireland'
                                : props.electoral_services.name}
                        </b>
                        :
                    </span>
                    <br />
                    <br />
                    <ul>
                        <li>
                            Website -{' '}
                            <a href={props.electoral_services.website}>
                                {props.electoral_services.website}
                            </a>
                        </li>
                        <li>Phone - {props.electoral_services.phone}</li>
                        <li>
                            Email -{' '}
                            <a href={'mailto:' + props.electoral_services.email}>
                                {props.electoral_services.email}
                            </a>
                        </li>
                    </ul>
                    <br />
                </div>
            )}
        </>
    );
}

export default StationNotFound;
