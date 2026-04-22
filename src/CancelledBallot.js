import React from 'react';
import CandidateList from './CandidateList';
import { formatDate } from './utils.js';
import { FormattedMessage, useIntl } from 'react-intl';

function CancelledBallot(props) {
  const { locale } = useIntl();
  const ballot = props.ballot;
  const initialPollDate = formatDate(new Date(ballot.poll_open_date), locale);

  if (ballot.cancellation_reason === 'CANDIDATE_DEATH') {
    return (
      <>
        <h4>
          <FormattedMessage id="cancelled.postponed_header" />
        </h4>
        <p>
          <FormattedMessage
            id="cancelled.candidate_death"
            values={{ initialPollDate: initialPollDate }}
          />
        </p>
      </>
    );
  }

  if (ballot.cancellation_reason === 'NO_CANDIDATES') {
    return (
      <>
        <h4>
          <FormattedMessage id="cancelled.postponed_header" />
        </h4>
        <p>
          <FormattedMessage
            id="cancelled.no_candidates"
            values={{ initialPollDate: initialPollDate }}
          />
        </p>
      </>
    );
  }

  if (ballot.cancellation_reason === 'EQUAL_CANDIDATES') {
    return (
      <>
        <h4>
          <FormattedMessage id="cancelled.uncontested_header" />
        </h4>
        <p>
          <FormattedMessage id="cancelled.equal_candidates" />
        </p>
        <div className="Candidates">
          <CandidateList candidates={props.ballot.candidates} />
        </div>
      </>
    );
  }

  if (ballot.cancellation_reason === 'UNDER_CONTESTED') {
    return (
      <>
        <h4>
          <FormattedMessage id="cancelled.postponed_header" />
        </h4>
        <p>
          <FormattedMessage
            id="cancelled.under_contested"
            values={{ initialPollDate: initialPollDate }}
          />
        </p>
      </>
    );
  }

  if (!ballot.cancellation_reason && ballot.metadata && ballot.metadata.cancelled_election) {
    const cancelled = ballot.metadata.cancelled_election;
    return (
      <>
        {cancelled.title && <h4>{cancelled.title}</h4>}
        {cancelled.detail && <p>{cancelled.detail}</p>}
        {cancelled.url && (
          <p>
            <a href={cancelled.url}>
              <FormattedMessage id="general.read-more" />
            </a>
          </p>
        )}
      </>
    );
  }

  return null;
}

export default CancelledBallot;
