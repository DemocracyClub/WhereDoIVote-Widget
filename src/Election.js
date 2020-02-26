import React from 'react';
import getWordsFromNumber from './utils';
import Ballot from './Ballot';

function Election(props) {
  const election = props.election;
  let electionDate = new Date(election.date);
  let dayMonthYear = electionDate.toLocaleDateString(props.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const activeBallots = election.ballots.filter(b => !b.cancelled);

  return (
    <section
      data-testid={`election-${election.date}`}
      className={`Election election-${props.single ? 'single' : 'multiple'}`}
    >
      {props.single && (
        <>
          <h1 data-testid={`title-election-${election.date}`} className="dc-header">
            {dayMonthYear}
          </h1>
          <p>
            Voters at your address in <strong className="postcode">{props.postcode}</strong> will
            have {getWordsFromNumber(activeBallots.length, props.messages)} ballot paper
            {activeBallots.length > 1 && 's'} to fill out:
          </p>
        </>
      )}
      {!props.single && (
        <p>
          On <strong className="date">{dayMonthYear}</strong> you will have{' '}
          {getWordsFromNumber(activeBallots.length, props.messages)} ballot paper
          {activeBallots.length > 1 && 's'} to fill out:
        </p>
      )}
      <ul className="inline-list">
        {activeBallots.map((ballot, i) => (
          <Ballot key={`Ballot-${i}`} {...props} ballot={ballot} />
        ))}
      </ul>
      {props.single && (
        <p>There may also be parish, town or community council elections in some areas.</p>
      )}
    </section>
  );
}

export default Election;
