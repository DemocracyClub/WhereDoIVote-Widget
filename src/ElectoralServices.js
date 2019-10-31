import React from 'react';

function ElectoralServices(props) {
  return (
    <>
      <span id="dc_get_in_touch">
        Get in touch with{' '}
        <strong>
          {props.es.council_id.startsWith('N09')
            ? 'The Electoral Office for Northern Ireland'
            : props.es.name}
        </strong>
        :
      </span>
      <ul>
        <li>
          Website -{' '}
          <a href={props.es.website} title={`Visit ${props.es.name}'s website`}>
            {props.es.website}
          </a>
        </li>
        <li>Phone - {props.es.phone}</li>
        <li>
          Email -{' '}
          <a href={'mailto:' + props.es.email} title={`Send ${props.es.website}' an email`}>
            {props.es.email}
          </a>
        </li>
      </ul>
    </>
  );
}

export default ElectoralServices;
