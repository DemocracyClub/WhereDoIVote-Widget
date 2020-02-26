import React from 'react';
import getWordsFromNumber from './utils';
import Ballot from './Ballot';

function Election(props) {
  const election = props.election;
  let electionDate = new Date(election.date);
  let dayMonthYear = electionDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={`Election election-${props.single ? 'single' : 'multiple'}`}>
      {props.single && (
        <>
          <h1 className="dc-header">{dayMonthYear}</h1>
          <p>
            Voters at your address in <strong className="postcode">{props.postcode}</strong> will
            have {getWordsFromNumber(election.ballots.length, props.messages)} ballot paper
            {election.ballots.length > 1 && 's'} to fill out:
          </p>
        </>
      )}
      {!props.single && (
        <p>
          On <strong className="date">{dayMonthYear}</strong> you will have{' '}
          {getWordsFromNumber(election.ballots.length, props.messages)} ballot paper
          {election.ballots.length > 1 && 's'} to fill out:
        </p>
      )}
      <ul className="inline-list">
        {election.ballots.map((ballot, i) => (
          <>{!ballot.cancelled && <Ballot key={`Ballot-${i}`} {...props} ballot={ballot} />}</>
        ))}
      </ul>
      {props.single && (
        <p>There may also be parish, town or community council elections in some areas.</p>
      )}
    </section>
  );
}

export default Election;
