import React from 'react';
import { FormattedMessage } from 'react-intl';
import getWordsFromNumber from './utils';
import Ballot from './Ballot';

/*
A group of ballots happening on the same date.
Each object in the dates[] array in the devs.DC API
maps on to a PollingDate() in the front-end.
We're calling it PollingDate to avoid the name collision
with javascript's built-in Date().
*/
function PollingDate(props) {
  const date = props.date;
  let electionDate = new Date(date.date);
  let dayMonthYear = electionDate.toLocaleDateString(props.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const activeBallots = date.ballots.filter((b) => !b.cancelled);

  // Loop through all ballots and see if any of the requires_voter_id
  // values are set. If so, set next_date_requires_voter_id to that value
  // This is because if any ballot requires voter ID, we need to tell the user
  // to bring ID
  let voter_id_requirements = false;
  date.ballots.every(function (ballot) {
    if (ballot.requires_voter_id) {
      voter_id_requirements = ballot.requires_voter_id;
      return voter_id_requirements;
    }
    return voter_id_requirements;
  });

  return (
    <section
      data-testid={`date-${date.date}`}
      className={`PollingDate date-${props.single ? 'single' : 'multiple'}`}
    >
      {props.single && (
        <div>
          <h2 data-testid={`title-date-${date.date}`} className="eiw-header">
            {dayMonthYear}
          </h2>
          {activeBallots.length > 0 && (
            <p>
              <FormattedMessage
                id="pollingdate.ballot-papers"
                values={{
                  num: getWordsFromNumber(activeBallots.length, props.messages),
                  bp: activeBallots.length === 1 ? 'ballot paper' : 'ballot papers',
                }}
              />
            </p>
          )}
        </div>
      )}
      {!props.single &&
        (activeBallots.length ? (
          <p>
            <FormattedMessage
              id="pollingdate.on-date-ballot-papers"
              values={{
                date: <strong className="date">{dayMonthYear}</strong>,
                num: getWordsFromNumber(activeBallots.length, props.messages),
                bp: activeBallots.length === 1 ? 'ballot paper' : 'ballot papers',
              }}
            />
          </p>
        ) : (
          <p>
            <strong className="date">{dayMonthYear}</strong>
          </p>
        ))}
      <ul className="inline-list">
        {date.ballots.map((ballot, i) => (
          <Ballot key={`Ballot-${i}`} {...props} ballot={ballot} />
        ))}
      </ul>
      {props.single && activeBallots.length > 0 && props.showParishText && (
        <p>
          <FormattedMessage
            id="pollingdate.parish"
            description="There may also be parish, town or community council elections in some areas."
          />
        </p>
      )}
      {voter_id_requirements && (
        <div>
          <h4 className="eiw-secondary-header">
            <FormattedMessage id="voter_id_requirements.header" description="Voter ID" />
          </h4>
        </div>
      )}
      {voter_id_requirements === 'EA-2022' && (
        <div>
          <p>
            <FormattedMessage
              id="voter_id_requirements.instructions"
              description="You will need to take photo ID to vote at a polling station in this election. You do not need your poll card to vote. You must vote at your assigned polling station."
            />
            <a href="https://www.electoralcommission.org.uk/voting-and-elections/voter-id/accepted-forms-photo-id">
              <FormattedMessage
                id="voter_id_requirements.acceptable-id"
                description="Check the list of accepted forms of photo ID."
              />
            </a>
          </p>
          <p>
            <a href="https://www.gov.uk/how-to-vote">
              <FormattedMessage
                id="voter_id_requirements.how-to-vote"
                description="Read more about voting in Great Britain."
              />
            </a>
          </p>
        </div>
      )}
    </section>
  );
}

export default PollingDate;
