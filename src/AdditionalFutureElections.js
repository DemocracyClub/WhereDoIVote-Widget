import React from 'react';
import { FormattedMessage } from 'react-intl';
import PollingDate from './PollingDate';

function AdditionalFutureElections(props) {
  return (
    <>
      <h1 className="header">
        <FormattedMessage id="future.more-elections" description="More elections in your area" />
      </h1>
      {props.dates.map((date, i) => (
        <PollingDate key={`date-${i}`} single={false} date={date} {...props} />
      ))}
    </>
  );
}

export default AdditionalFutureElections;
