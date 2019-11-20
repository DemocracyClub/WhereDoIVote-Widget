import React from 'react';

function CandidateItem(props) {
  const { candidate } = props;
  let partyId = candidate.party.party_id.split(':')[1];
  return (
    <li className="CandidateItem">
      <h2 className={`party-name party-${partyId}`}>{candidate.party.party_name}</h2>
      <h3 className="candidate-name">
        <a href={candidate.person.absolute_url} target="_blank" rel="noopener noreferrer">
          {candidate.person.name}
        </a>
      </h3>
    </li>
  );
}

export default CandidateItem;
