import React from 'react';
import { injectIntl } from 'react-intl';
import BallotInfo from './BallotInfo';

function Ballot(props) {
  const ballot = props.ballot;
  const candidatesVerified = ballot.candidates.length > 1 && ballot.candidates_verified;
  const isConstituency = ['parl.', 'nia.', 'gla.c.', 'senedd.c.', 'sp.c.'].some((prefix) =>
    ballot.ballot_paper_id.startsWith(prefix)
  );
  const isRegion = ['senedd.r.', 'sp.r.'].some((prefix) =>
    ballot.ballot_paper_id.startsWith(prefix)
  );
  const isByElection = ballot.ballot_paper_id.includes('.by.');
  let divisionType = '';
  if (isConstituency) {
    divisionType = 'Constituency';
  } else if (isRegion) {
    divisionType = 'Region';
  }
  let bySuffix = '';
  if (isByElection) {
    bySuffix = 'by-election';
  }
  return (
    <li className="Ballot" data-testid={ballot.ballot_paper_id}>
      <h3 className={`eiw-secondary-header ${!candidatesVerified && 'full-width'}`}>
        {ballot.cancelled ? (
          <span role="img" aria-label="Red cross">
            ❌
          </span>
        ) : (
          <span role="img" aria-label="Ballot box">
            🗳️
          </span>
        )}{' '}
        {ballot.election_name + ': ' + ballot.post_name + ' ' + divisionType + ' ' + bySuffix}
      </h3>
      <BallotInfo {...props} />
    </li>
  );
}

export default injectIntl(Ballot);
