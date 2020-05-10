import React, { useState } from 'react';
import Candidates from './Candidates';

function Ballot(props) {
  const [candidatesVisible, setShowCandidates] = useState(false);
  const ballot = props.ballot;
  const candidatesVerified = ballot.candidates.length > 1 && ballot.candidates_verified;
  return (
    <li className="Ballot" data-testid={ballot.ballot_paper_id}>
      <h2 className={`dc-secondary-header ${!candidatesVerified && 'full-width'}`}>
        <span role="img" aria-label="Ballot box">
          🗳️
        </span>{' '}
        <a href={ballot.wcivf_url} target="_blank" rel="noopener noreferrer">
          {ballot.ballot_title}
        </a>
      </h2>

      {candidatesVerified && (
        <button
          aria-expanded={candidatesVisible}
          data-testid={`show-candidates-button-${ballot.ballot_paper_id}`}
          className={`inline-button ${candidatesVisible ? 'toggled' : null} `}
          onClick={() => setShowCandidates(!candidatesVisible)}
        >
          {candidatesVisible ? 'Hide' : 'Show'} candidates
        </button>
      )}
      {candidatesVisible && candidatesVerified && <Candidates {...props} />}
    </li>
  );
}

export default Ballot;
