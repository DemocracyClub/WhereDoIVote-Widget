import React from 'react';
import { FormattedMessage } from 'react-intl';
import CandidateItem from './CandidateItem';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      <h1 className="dc-header">
        <FormattedMessage id="candidates.candidates-for" description="Candidates for" />{' '}
        {props.ballot.ballot_title}
      </h1>
      <ul>
        {props.ballot.candidates.map((candidate, i) => (
          <CandidateItem candidate={candidate} key={`candidate-${i}`} />
        ))}
      </ul>
    </section>
  );
}

export default Candidates;
