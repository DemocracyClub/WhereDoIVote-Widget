import React from 'react';

function ElectoralServices(props) {
    return (
        <>
            <div>
                <span id="dc_get_in_touch">
                    Get in touch with{' '}
                    <b>
                        {props.es.council_id.startsWith('N09')
                            ? 'The Electoral Office for Northern Ireland'
                            : props.es.name}
                    </b>
                    :
                </span>
                <br />
                <br />
                <ul>
                    <li>
                        Website - <a href={props.es.website}>{props.es.website}</a>
                    </li>
                    <li>Phone - {props.es.phone}</li>
                    <li>
                        Email - <a href={'mailto:' + props.es.email}>{props.es.email}</a>
                    </li>
                </ul>
                <br />
            </div>
        </>
    );
}

export default ElectoralServices;
