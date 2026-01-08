import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

function getLevelAccessText(props) {
  if (props.level_access === null || props.level_access === undefined) {
    return null;
  }

  if (props.level_access) {
    return <FormattedMessage id="accessibility.level-access" />;
  }

  if (!props.level_access && props.temporary_ramp) {
    return <FormattedMessage id="accessibility.temporary-ramp" />;
  }

  // lack of level access or temporary ramp implies permanent ramp
  if (!props.level_access && !props.temporary_ramp) {
    return <FormattedMessage id="accessibility.permanent-ramp" />;
  }

  return null;
}

function DisabledParkingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21.01" height="21.89" viewBox="0 0 15.76 16.42">
      <g fillRule="evenodd">
        <path d="M1.53 12.24h12.7V1.55H1.53ZM14.23.41H1.53C.9.41.4.92.4 1.55v10.7c0 .62.51 1.13 1.14 1.13h5.19v1.49c0 .63.5 1.14 1.14 1.14h.04c.63 0 1.14-.51 1.14-1.14v-1.49h5.19c.63 0 1.14-.5 1.14-1.14V1.55c0-.63-.51-1.14-1.14-1.14z" />
        <path d="M4.53 4.67c.1 0 .19 0 .28-.02a.62.62 0 0 0 .23-.08c.06-.04.12-.1.16-.17a.72.72 0 0 0 0-.58.45.45 0 0 0-.16-.17.66.66 0 0 0-.23-.08l-.28-.02H3.9v1.12zm.23-1.76c.2 0 .4.03.6.1a1.03 1.03 0 0 1 .62.65c.1.3.1.6 0 .9a1.03 1.03 0 0 1-.63.65c-.19.07-.39.1-.6.1H3.9v1.34h-.83V2.9zM12.3 10.6a.57.57 0 0 1-.69-.42l-.38-1.6H9.04a.57.57 0 0 1-.56-.47L8 5.27a.57.57 0 1 1 1.13-.2l.04.29h2a.57.57 0 0 1 0 1.13h-1.8l.16.95h2.16c.26 0 .49.18.55.44l.49 2.03c.07.3-.12.61-.43.68" />
        <path d="m10.63 9.35.13.5a2.42 2.42 0 0 1-2.07 1.06 2.42 2.42 0 0 1-2.5-2.49 2.43 2.43 0 0 1 1.2-2.16l.24 1.27a1.38 1.38 0 0 0 2.08 1.82zM7.8 4.13a.92.92 0 0 1-.27-.68.94.94 0 1 1 1.88 0 .95.95 0 0 1-1.61.68" />
      </g>
    </svg>
  );
}

function GettingThere(props) {
  const { locale } = useIntl();

  return (
    <>
      <h4 className="eiw-secondary-header">
        <FormattedMessage id="accessibility.getting-there-heading" />
      </h4>

      {props.is_temporary && (
        <p>
          <FormattedMessage id="accessibility.temporary-structure" />
        </p>
      )}

      {props.getting_to_the_station && locale == 'en' && (
        <>
          <p>
            <strong>
              <FormattedMessage id="accessibility.getting-to-the-station" />
            </strong>
          </p>
          <p>{props.getting_to_the_station}</p>
        </>
      )}
      {props.getting_to_the_station_cy && locale == 'cy' && (
        <>
          <p>
            <strong>
              <FormattedMessage id="accessibility.getting-to-the-station" />
            </strong>
          </p>
          <p>{props.getting_to_the_station_cy}</p>
        </>
      )}
    </>
  );
}

function AtTheStation(props) {
  const { locale } = useIntl();

  return (
    <>
      {props.at_the_station && locale == 'en' && (
        <>
          <p>
            <strong>
              <FormattedMessage id="accessibility.at-the-station" />
            </strong>
          </p>
          <p>{props.at_the_station}</p>
        </>
      )}
      {props.at_the_station_cy && locale == 'cy' && (
        <>
          <p>
            <strong>
              <FormattedMessage id="accessibility.at-the-station" />
            </strong>
          </p>
          <p>{props.at_the_station_cy}</p>
        </>
      )}
    </>
  );
}

function Accessibility(props) {
  const levelAccessText = getLevelAccessText(props);
  const showGettingThere = props.is_temporary || props.getting_to_the_station;
  const showA11yList =
    props.nearby_parking ||
    props.disabled_parking ||
    levelAccessText ||
    props.hearing_loop ||
    props.public_toilets;

  return (
    <>
      {showGettingThere && <GettingThere {...props} />}

      {showA11yList && (
        <>
          <h4 className="eiw-secondary-header">
            <FormattedMessage id="accessibility.at-the-station-heading" />
          </h4>
          <p>
            <FormattedMessage id="accessibility.polling-station-has" />
          </p>
          <ul className="accessibilty-list">
            {props.nearby_parking && (
              <li>
                <span aria-hidden="true">🅿️</span>{' '}
                <FormattedMessage id="accessibility.nearby-parking" />
              </li>
            )}
            {props.disabled_parking && (
              <li>
                <span aria-hidden="true">
                  <DisabledParkingIcon />
                </span>{' '}
                <FormattedMessage id="accessibility.disabled-parking" />
              </li>
            )}
            {levelAccessText && (
              <li>
                <span aria-hidden="true">♿</span> {levelAccessText}
              </li>
            )}
            {props.hearing_loop && (
              <li>
                <span aria-hidden="true">🦻</span>{' '}
                <FormattedMessage id="accessibility.hearing-loop" />
              </li>
            )}
            {props.public_toilets && (
              <li>
                <span aria-hidden="true">🚻</span>{' '}
                <FormattedMessage id="accessibility.public-toilets" />
              </li>
            )}
          </ul>
        </>
      )}

      <AtTheStation {...props} />
    </>
  );
}

export { Accessibility };
