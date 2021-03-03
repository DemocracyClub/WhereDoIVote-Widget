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

  return (
    <section
      data-testid={`date-${date.date}`}
      className={`PollingDate date-${props.single ? 'single' : 'multiple'}`}
    >
      {props.single && (
        <>
          <h1 data-testid={`title-date-${date.date}`} className="header">
            {dayMonthYear}
          </h1>
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
        </>
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
      {props.single && activeBallots.length > 0 && (
        <p>
          <FormattedMessage
            id="pollingdate.parish"
            description="There may also be parish, town or community council elections in some areas."
          />
        </p>
      )}
    </section>
  );
}

export default PollingDate;
