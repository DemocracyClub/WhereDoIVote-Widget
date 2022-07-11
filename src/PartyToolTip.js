import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';

function PartyToolTip(props) {
  const prevParties = props.candidate.previous_party_affiliations;

  if (prevParties) {
    return (
      <div id="ToolTipContainer">
        <button
          clickable="true"
          data-tip="Other party affiliations"
          data-event="click"
          data-for="PartyToolTip"
          data-offset="{'top': 10}"
          role="note"
          aria-label="PartyToolTip"
        >
          i
        </button>

        <ReactTooltip id="PartyToolTip" effect="solid" type="info">
          <FormattedMessage
            id="candidate.affiliations"
            description="Affiliated with the following parties in the last 12 months:"
          />
          {prevParties.map((party, i) => (
            <span key={i}>
              {' '}
              {party.party_name}
              {i !== prevParties.length - 1 ? ', ' : ''}
            </span>
          ))}
        </ReactTooltip>
      </div>
    );
  } else {
    return '';
  }
}

export default PartyToolTip;
