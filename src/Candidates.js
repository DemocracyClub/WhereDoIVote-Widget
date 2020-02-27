import React from 'react';
import CandidateItem from './CandidateItem';
import BallotTypeList from './BallotTypeList';

function Candidates(props) {
  return (
    <>
      {!props.ballot.election_id.includes('gla.a') && (
        <section className="Candidates" data-testid="candidates">
          <ul>
            {props.ballot.candidates.map((candidate, i) => (
              <CandidateItem candidate={candidate} key={`candidate-${i}`} />
            ))}
          </ul>
        </section>
      )}
      {props.ballot.election_id.includes('gla.a') && <BallotTypeList {...props} />}
    </>
  );
}

export default Candidates;
