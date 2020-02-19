import React, { useState } from 'react';
import Candidates from './Candidates';

function Ballot(props) {
  const [showCandidates, setShowCandidates] = useState(false);

  return (
    <li className="Ballot" data-testid={props.ballot.election_id}>
      <h2 className="dc-secondary-header">{props.ballot.election_name}</h2>
      {props.enableCandidates && (
        <button onClick={() => setShowCandidates(!showCandidates)}>Toggle candidates</button>
      )}
      {showCandidates && props.ballot.candidates_verified && <Candidates {...props} />}
    </li>
  );
}

export default Ballot;
