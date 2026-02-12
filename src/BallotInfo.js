import React from 'react';
import Candidates from './Candidates';
import getWordsFromNumber from './utils';
import { FormattedMessage } from 'react-intl';

function BallotInfo(props) {
  const ballot = props.ballot;
  const { formatMessage } = props.intl;

  return (
    <section className="BallotInfo">
      {!ballot.metadata &&
      ballot.cancelled &&
      ballot.candidates.length === ballot.seats_contested ? (
        <p data-testid="ballot-info">
          <FormattedMessage
            id="uncontested.equal_candidates"
            description="Uncontested election with equal candidates to seats"
            values={{
              is_or_are: ballot.seats_contested === 1 ? 'is' : 'are',
              seats_contested: getWordsFromNumber(ballot.seats_contested, props.messages),
              seat_or_seats: ballot.seats_contested === 1 ? 'seat' : 'seats',
              post: ballot.post_name,
              num_candidates: getWordsFromNumber(ballot.candidates.length, props.messages),
              candidate_or_candidates: ballot.candidates.length === 1 ? 'candidate' : 'candidates',
            }}
          />
        </p>
      ) : !ballot.metadata &&
        ballot.cancelled &&
        ballot.candidates.length < ballot.seats_contested ? (
        <p data-testid="ballot-info">
          <FormattedMessage
            id="uncontested.fewer_candidates"
            description="Uncontested election with fewer candidates than seats"
            values={{
              is_or_are: ballot.seats_contested === 1 ? 'is' : 'are',
              seats_contested: getWordsFromNumber(ballot.seats_contested, props.messages),
              seat_or_seats: ballot.seats_contested === 1 ? 'seat' : 'seats',
              post: ballot.post_name,
              num_candidates: getWordsFromNumber(ballot.candidates.length, props.messages),
              candidate_or_candidates: ballot.candidates.length === 1 ? 'candidate' : 'candidates',
            }}
          />
        </p>
      ) : null}

      {!ballot.metadata &&
      ballot.cancelled &&
      ballot.candidates.length < ballot.seats_contested &&
      ballot.candidates.length !== 0 ? (
        <p data-testid="automatic-winner">
          <FormattedMessage
            id="uncontested.fewer_candidates.not_zero"
            description="Uncontested election with fewer candidates than seats but not zero"
            values={{
              seats_contested: getWordsFromNumber(ballot.seats_contested, props.messages),
              has_or_have: ballot.candidates.length === 1 ? 'has' : 'have',
              seat_or_seats: ballot.seats_contested === 1 ? 'seat' : 'seats',
              num_candidates: getWordsFromNumber(ballot.candidates.length, props.messages),
              candidate_or_candidates: ballot.candidates.length === 1 ? 'candidate' : 'candidates',
              winner_or_winners: ballot.candidates.length === 1 ? 'winner' : 'winners',
            }}
          />
        </p>
      ) : null}

      {ballot.cancelled && ballot.metadata ? (
        <div>
          <p style={{ whiteSpace: 'pre-wrap' }} data-testid="election-metadata">
            {ballot.metadata.cancelled_election.detail}
          </p>
          {ballot.cancelled && ballot.metadata && ballot.metadata.cancelled_election.url ? (
            <a
              className="eiw-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              title={'Read more information'}
              href={ballot.metadata.cancelled_election.url}
            >
              Read More
            </a>
          ) : null}
        </div>
      ) : null}

      <Candidates {...props} />
      {process.env.REACT_APP_BRAND === 'EC' ? (
        <a href={props.ecLink} title={formatMessage({ id: 'elections.find-out-more-ec' })}>
          <FormattedMessage id="elections.find-out-more-ec" />
        </a>
      ) : (
        <a href={ballot.wcivf_url} title={formatMessage({ id: 'elections.find-out-more-wcivf' })}>
          <FormattedMessage id="elections.find-out-more-wcivf" />
        </a>
      )}
    </section>
  );
}

export default BallotInfo;
