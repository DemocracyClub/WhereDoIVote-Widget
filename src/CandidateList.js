import React from 'react';
import { injectIntl } from 'react-intl';
import PartyToolTip from './PartyToolTip.js';

function CandidateList(props) {
  const { formatMessage } = props.intl;
  const { candidates } = props;

  function handleCandidateList(candidates) {
    if (process.env.REACT_APP_BRAND === 'EC') {
      return (
        <ul>
          {candidates.map((candidate) => (
            <li className="CandidateListItem" key={candidate.person.ynr_id}>
              <h5 className={`candidate-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.person.name}
              </h5>{' '}
              <h6 className={`party-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.party.party_name}
              </h6>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul>
          {candidates.map((candidate) => (
            <li className="CandidateListItem" key={candidate.person.ynr_id}>
              <h5 className={`candidate-name party-${candidate.party.party_id.split(':')[1]}`}>
                <a
                  data-testid="candidate-link"
                  title={formatMessage({ id: 'general.read-more-info-candidate' })}
                  href={candidate.person.absolute_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {candidate.person.name}
                </a>
              </h5>{' '}
              <h6 className={`party-name party-${candidate.party.party_id.split(':')[1]}`}>
                {candidate.party.party_name}
                <PartyToolTip candidate={candidate} />
              </h6>
            </li>
          ))}
        </ul>
      );
    }
  }

  return <div>{handleCandidateList(candidates)}</div>;
}

export default injectIntl(CandidateList);
