import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import ElectoralServices from './ElectoralServices';
import { formatDate } from './utils';

function StationNotFound(props) {
  const { locale } = useIntl();
  const dayMonthYear = formatDate(new Date(props.electionDate), locale);

  return (
    <section className="StationNotFound" data-testid="station-not-found">
      <h2 className="eiw-header">
        <FormattedMessage
          id="station.not-found"
          description="We don't know where you should vote"
        />
      </h2>
      {props.electoral_services && <ElectoralServices es={props.electoral_services} />}
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
    </section>
  );
}

export default StationNotFound;
