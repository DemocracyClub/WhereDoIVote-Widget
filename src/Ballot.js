import React from 'react';
import { injectIntl } from 'react-intl';
import BallotInfo from './BallotInfo';

function Ballot(props) {
  const ballot = props.ballot;
  const candidatesVerified = ballot.candidates.length > 1 && ballot.candidates_verified;
  return (
    <li className="Ballot" data-testid={ballot.ballot_paper_id}>
      <h2 className={`eiw-secondary-header ${!candidatesVerified && 'full-width'}`}>
        {ballot.cancelled ? (
          <span role="img" aria-label="Red cross">
            ❌
          </span>
        ) : (
          <span role="img" aria-label="Ballot box">
            🗳️
          </span>
        )}{' '}
        {ballot.election_name}: {ballot.post_name}
      </h2>
      <BallotInfo {...props} />
    </li>
  );
}

export default injectIntl(Ballot);
