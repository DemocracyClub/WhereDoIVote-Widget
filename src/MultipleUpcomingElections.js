import React from 'react';
import Election from './Election';
import getWordsFromNumber from './utils';

function MultipleUpcomingElections(props) {
  return (
    <>
      <h1 className="dc-header">Elections in your area</h1>
      <p>
        Voters at your address in <strong className="postcode">{props.postcode}</strong> have{' '}
        {getWordsFromNumber(props.dates.length, props.messages)} upcoming election
        {props.dates.length > 1 && 's'}:
      </p>
      {props.dates.map((date, i) => (
        <Election key={`election-${i}`} single={false} election={date} {...props} />
      ))}
      <p>There may also be parish, town or community council elections in some areas.</p>
    </>
  );
}

export default MultipleUpcomingElections;
