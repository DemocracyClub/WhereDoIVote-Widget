import React from 'react';
import CancelledBallot from './CancelledBallot';
import Candidates from './Candidates';
import { FormattedMessage } from 'react-intl';

function BallotInfo(props) {
  const ballot = props.ballot;
  const { formatMessage } = props.intl;

  return (
    <section className="BallotInfo">
      {ballot.cancelled ? (
        <CancelledBallot ballot={ballot} />
      ) : (
        <>
          <Candidates {...props} />
          {process.env.REACT_APP_BRAND === 'EC' ? (
            <a href={props.ecLink} title={formatMessage({ id: 'elections.find-out-more-ec' })}>
              <FormattedMessage id="elections.find-out-more-ec" />
            </a>
          ) : (
            <a
              href={ballot.wcivf_url}
              title={formatMessage({ id: 'elections.find-out-more-wcivf' })}
            >
              <FormattedMessage id="elections.find-out-more-wcivf" />
            </a>
          )}
        </>
      )}
    </section>
  );
}

export default BallotInfo;
