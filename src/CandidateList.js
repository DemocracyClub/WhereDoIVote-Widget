import React from 'react';
import { injectIntl } from 'react-intl';

function CandidateList(props) {
  const { formatMessage } = props.intl;
  const { candidates } = props;

  function handleCandidateList(candidates) {
    if (process.env.REACT_APP_BRAND === 'EC') {
      return (
        <div>
          {candidates.map((candidate) => (
            <li className="CandidateListItem" key={candidate.person.ynr_id}>
              <h4 className={`candidate-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.person.name}
              </h4>{' '}
              <h5 className={`party-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.party.party_name}
              </h5>
            </li>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {candidates.map((candidate) => (
            <li className="CandidateListItem" key={candidate.person.ynr_id}>
              <h4 className={`candidate-name party-${candidate.party.party_id.split(':')[1]}`}>
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
              <h5 className={`party-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.party.party_name}
              </h5>
            </li>
          ))}
        </div>
      );
    }
  }

  return <ul>{handleCandidateList(candidates)}</ul>;
}

export default injectIntl(CandidateList);
