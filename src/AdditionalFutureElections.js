import React from 'react';
import { FormattedMessage } from 'react-intl';
import PollingDate from './PollingDate';

function AdditionalFutureElections(props) {
  return (
    <>
      <h2 className="eiw-header">
        <FormattedMessage id="future.more-elections" description="More elections in your area" />
      </h2>
      {props.dates.map((date, i) => (
        <PollingDate key={`date-${i}`} single={false} date={date} {...props} />
      ))}
    </>
  );
}

export default AdditionalFutureElections;
