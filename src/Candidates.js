import React from 'react';
import CandidateList from './CandidateList';
import PartyList from './PartyList';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      {!props.ballot.election_id.includes('gla.a') && (
        <CandidateList candidates={props.ballot.candidates} />
      )}
      {props.ballot.election_id.includes('gla.a') && <PartyList {...props} />}
    </section>
  );
}

export default Candidates;
