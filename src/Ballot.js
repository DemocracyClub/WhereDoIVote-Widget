import React from 'react';
import { injectIntl } from 'react-intl';
import BallotInfo from './BallotInfo';

function isConstituency(ballot_paper_id) {
  if (ballot_paper_id.startsWith('senedd.')) {
    if (ballot_paper_id.startsWith('senedd.r.')) {
      return false;
    }
    return true;
  }
  if (
    ['parl.', 'nia.', 'gla.c.', 'senedd.c.', 'sp.c.'].some((prefix) =>
      ballot_paper_id.startsWith(prefix)
    )
  ) {
    return true;
  }
  return false;
}

function isRegion(ballot_paper_id) {
  return ['senedd.r.', 'sp.r.'].some((prefix) => ballot_paper_id.startsWith(prefix));
}

function Ballot(props) {
  const { formatMessage } = props.intl;
  const ballot = props.ballot;
  const candidatesVerified = ballot.candidates.length > 1 && ballot.candidates_verified;
  const isByElection = ballot.ballot_paper_id.includes('.by.');
  let divisionType = '';
  if (isConstituency(ballot.ballot_paper_id)) {
    divisionType = formatMessage({ id: 'divisionType.constituency' });
  } else if (isRegion(ballot.ballot_paper_id)) {
    divisionType = formatMessage({ id: 'divisionType.region' });
  }
  let bySuffix = '';
  if (isByElection) {
    bySuffix = formatMessage({ id: 'election.byelection' });
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
export { isConstituency, isRegion };
