import React from 'react';
import Candidates from './Candidates';
import { FormattedMessage } from 'react-intl';

function BallotInfo(props) {
  const ballot = props.ballot;
  const { formatMessage } = props.intl;
  return (
    <section className="BallotInfo" data-testid="ballot-info">
      {ballot.cancelled &&
        (ballot?.metadata?.cancelled_election?.detail ? (
          <p>{ballot.metadata.cancelled_election.detail}</p>
        ) : (
          <p>
            The poll for <strong>{ballot.ballot_title}</strong> has been cancelled.
          </p>
        ))}
      <Candidates {...props} />
      <a href={ballot.wcivf_url} title={formatMessage({ id: 'elections.find-out-more' })}>
        <FormattedMessage
          id="elections.find-out-more"
          description="Find out more at WhoCanIVoteFor"
        />
      </a>
    </section>
  );
}

export default BallotInfo;
