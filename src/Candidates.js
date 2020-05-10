import React from 'react';
import CandidateItem from './CandidateItem';
import PartyList from './PartyList';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      {!props.ballot.election_id.includes('gla.a') && (
        <ul>
          {props.ballot.candidates.map((candidate, i) => (
            <CandidateItem candidate={candidate} key={`candidate-${i}`} />
          ))}
        </ul>
      )}
      {props.ballot.election_id.includes('gla.a') && <PartyList {...props} />}
    </section>
  );
}

export default Candidates;
