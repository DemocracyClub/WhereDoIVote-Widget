import React from 'react';
import CandidateItem from './CandidateItem';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      <ul>
        {props.ballot.candidates.map((candidate, i) => (
          <CandidateItem candidate={candidate} key={`candidate-${i}`} />
        ))}
      </ul>
    </section>
  );
}

export default Candidates;
