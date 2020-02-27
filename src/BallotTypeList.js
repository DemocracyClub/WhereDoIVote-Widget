import React from 'react';

function BallotTypeList(props) {
  const cddts = props.ballot.candidates;
  const allPartiesNames = cddts.map(c => c.party.party_name);
  const partyNames = Array.from(new Set(allPartiesNames));
  const parties = [];

  for (let i = 0; i < partyNames.length; i++) {
    const candidates = cddts.filter(c => c.party.party_name === partyNames[i]);
    const party = {
      party_id: candidates[0].party.party_id,
      party_name: partyNames[i],
    };
    parties.push(party);
  }
  return (
    <section data-testid={props.ballot.ballot_paper_id} className="BallotTypeList">
      <p>You will vote for your preferred party rather than a candidate on this ballot paper</p>
      <ul>
        {parties.map(party => (
          <li className="BallotTypeListItem" key={party.party_id}>
            <h4 className={`candidate-name party-${party.party_id.split(':')[1]}`}>
              {party.party_name}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BallotTypeList;
