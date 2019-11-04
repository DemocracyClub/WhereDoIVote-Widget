import React from 'react';
import translations from './translations/en';

function ElectoralServices(props) {
  return (
    <>
      <span id="dc_get_in_touch">
        {translations['elections.get-in-touch-with']}{' '}
        <strong>
          {props.es.council_id.startsWith('N09')
            ? translations['elections.ni-office']
            : props.es.name}
        </strong>
        :
      </span>
      <ul>
        <li>
          {translations['general.website']} -{' '}
          <a href={props.es.website} title={`Visit ${props.es.name}'s website`}>
            {props.es.website}
          </a>
        </li>
        <li>
          {translations['general.phone']} - {props.es.phone}
        </li>
        <li>
          {translations['general.email']} -{' '}
          <a href={'mailto:' + props.es.email} title={`Send ${props.es.name} an email`}>
            {props.es.email}
          </a>
        </li>
      </ul>
    </>
  );
}

export default ElectoralServices;
