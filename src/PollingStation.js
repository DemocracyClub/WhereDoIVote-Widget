import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Accessibility } from './Accessibility';
import { Notifications } from './Notifications';
import { Directions } from './Directions';
import { formatDate } from './utils';

function PollingStation(props) {
  const { locale } = useIntl();
  const dayMonthYear = formatDate(new Date(props.electionDate), locale);

  let splitAddress = [];

  props.station.address.split(',').forEach(function (line, index) {
    if (line.trim()) {
      splitAddress.push(line.trim());
      splitAddress.push(<br key={index} />);
    }
  });

  return (
    <section className="PollingStation" data-testid="station-found">
      <h3 className="eiw-secondary-header">
        <FormattedMessage id="station.your-station" description="Vote on Polling Day" />
      </h3>
      <address data-testid="address" className="address">
        <p>{splitAddress.slice(0, splitAddress.length - 1)}</p>
      </address>
      {props.openingTimes && (
        <p>
          <FormattedMessage
            id="station.opening-hours"
            values={{
              start: props.openingTimes.start,
              end: props.openingTimes.end,
              date: dayMonthYear,
            }}
          />
        </p>
      )}

      {props.station.location && (
        <Directions origin={props.originPoint} destination={props.station.location} />
      )}
      {props.accessibilityInformation && <Accessibility {...props.accessibilityInformation} />}

      <Notifications list={props.notifications} />
    </section>
  );
}

export default PollingStation;
