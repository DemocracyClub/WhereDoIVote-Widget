import React from 'react';
import { injectIntl } from 'react-intl';

function CandidateItem(props) {
  const { formatMessage } = props.intl;
  const { candidate } = props;
  let partyId = candidate.party.party_id.split(':')[1];
  return (
    <li className="CandidateItem">
      <h4 className={`candidate-name party-${partyId}`}>
        <a
          data-testid="candidate-link"
          title={formatMessage({ id: 'general.read-more-info-candidate' })}
          href={candidate.person.absolute_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {candidate.person.name}
        </a>
      </h4>{' '}
      <h5 className={`party-name party-${partyId}`}>{candidate.party.party_name}</h5>
    </li>
  );
}

export default injectIntl(CandidateItem);
