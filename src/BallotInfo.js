import React from 'react';
import Candidates from './Candidates';

function BallotInfo(props) {
  const ballot = props.ballot;
  return (
    <section className="BallotInfo" data-testid="ballot-info">
      {ballot.cancelled &&
        (ballot?.metadata?.cancelled_election?.detail ? (
          <p>{ballot.metadata.cancelled_election.detail}</p>
        ) : (
          <p>
            The poll for <strong>{ballot.ballot_title}</strong> has been cancelled.
          </p>
        ))}
      <Candidates {...props} />
      <a href={ballot.wcivf_url}>Find out more at WhoCanIVoteFor</a>
    </section>
  );
}

export default BallotInfo;
