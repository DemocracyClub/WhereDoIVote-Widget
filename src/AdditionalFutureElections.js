import React from 'react';
import PollingDate from './PollingDate';

function AdditionalFutureElections(props) {
  return (
    <>
      <h1 className="dc-header">More elections in your area</h1>
      {props.dates.map((date, i) => (
        <PollingDate key={`date-${i}`} single={false} date={date} {...props} />
      ))}
    </>
  );
}

export default AdditionalFutureElections;
