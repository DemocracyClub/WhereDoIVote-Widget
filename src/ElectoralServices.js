import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

function ElectoralServices(props) {
  const { formatMessage } = props.intl;
  return (
    <>
      <span id="dc_get_in_touch">
        <FormattedMessage id="elections.get-in-touch-with" description="Get in touch with" />{' '}
        <strong>
          {props.es.council_id.startsWith('N09')
            ? formatMessage({ id: 'elections.ni-office' })
            : props.es.name}
        </strong>
        :
      </span>
      <ul data-testid="council-details">
        <li>
          <FormattedMessage id="general.website" description="Website" /> -{' '}
          <a
            href={props.es.website}
            title={`${formatMessage({ id: 'general.visit-council-website' })} ${props.es.name}`}
          >
            {props.es.website}
          </a>
        </li>
        <li>
          <FormattedMessage id="general.phone" description="Phone" /> - {props.es.phone}
        </li>
        <li>
          <FormattedMessage id="general.email" description="Email" /> -{' '}
          <a
            href={'mailto:' + props.es.email}
            title={`${formatMessage({ id: 'general.email-council' })} ${props.es.name}`}
          >
            {props.es.email}
          </a>
        </li>
      </ul>
    </>
  );
}

export default injectIntl(ElectoralServices);
