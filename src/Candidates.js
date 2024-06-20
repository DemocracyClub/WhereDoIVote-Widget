import React from 'react';
import CandidateList from './CandidateList';
import PartyList from './PartyList';
import { injectIntl } from 'react-intl';

function Candidates(props) {
  const ballot = props.ballot;
  const uses_party_lists = ballot.voting_system.uses_party_lists;
  const candidatesVerified = ballot.candidates.length > 1 && ballot.candidates_verified;
  const { formatMessage } = props.intl;
  return (
    <>
      {candidatesVerified && !ballot.cancelled && (
        <section className="Candidates" data-testid="candidates">
          <h3>{formatMessage({ id: 'elections.candidates_heading' })}</h3>
          {uses_party_lists ? (
            <PartyList {...props} />
          ) : (
            <CandidateList candidates={props.ballot.candidates} />
          )}
        </section>
      )}
    </>
  );
}

export default injectIntl(Candidates);
