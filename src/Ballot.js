import React, { useState } from 'react';
import Candidates from './Candidates';

function Ballot(props) {
  const [showCandidates, setShowCandidates] = useState(false);
  const ballot = props.ballot;
  const willShowCandidates = ballot.candidates.length > 1;
  return (
    <li className="Ballot" data-testid={ballot.ballot_paper_id}>
      <h2 className={`dc-secondary-header ${!willShowCandidates && 'full-width'}`}>
        <span role="img" alt="Ballot box emoji" aria-label="Ballot box emoji">
          🗳️
        </span>{' '}
        <a href={ballot.wcivf_url} target="_blank" rel="noopener noreferrer">
          {ballot.ballot_title}
        </a>
      </h2>

      {props.enableCandidates && willShowCandidates && (
        <button
          className={`inline-button ${showCandidates ? 'toggled' : null} `}
          onClick={() => setShowCandidates(!showCandidates)}
        >
          {showCandidates ? 'Hide' : 'Show'} candidates
        </button>
      )}
      {showCandidates && ballot.candidates.length > 1 && <Candidates {...props} />}
    </li>
  );
}

export default Ballot;
