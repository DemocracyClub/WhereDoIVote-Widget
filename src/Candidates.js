import React from 'react';
import CandidateList from './CandidateList';
import PartyList from './PartyList';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      {props.ballot.voting_system.uses_party_lists === true ? (
        <PartyList {...props} />
      ) : (
        <CandidateList candidates={props.ballot.candidates} />
      )}
    </section>
  );
}

export default Candidates;
