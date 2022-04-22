import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Notifications } from './Notifications';
import { Directions } from './Directions';

function AdvanceVoting(props) {
  let splitAddress = [];

  props.advance_voting_station.address.split('\n').forEach(function (line, index) {
    splitAddress.push(line.trim());
    splitAddress.push(<br key={index} />);
  });

  let advanceVotingTimesTable = (
    <div className="ds-table">
      <table>
        <thead></thead>
        <caption>
          <FormattedMessage
            id="advance-voting-station.opening-hours"
            description="Advance voting station opening times"
          />
        </caption>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="advance-voting-station.date" description="Date" />
            </th>
            <th>
              <FormattedMessage id="advance-voting-station.open" description="Open" />
            </th>
          </tr>

          {props.advance_voting_station.opening_times.map((opening_time, index) => {
            let advanceVotingDate = new Date(opening_time[0]);
            let dayMonthYear = advanceVotingDate.toLocaleDateString(props.locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            let openingTime = opening_time[1].substring(0, 5);
            let closingTime = opening_time[2].substring(0, 5);
            return (
              <tr key={index}>
                <td>{dayMonthYear}</td>
                <td>
                  {openingTime}-{closingTime}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <section className="AdvancedVotingStation">
      <p>
        <FormattedMessage
          id="advance-voting-station.trial"
          description="Your council is trialling a system that allows you to vote in person before polling day. You can vote in advance at this location, or vote at your polling station as normal on polling day."
        />
      </p>
      <h2 className="eiw-secondary-header" data-testid="advance-voting-station">
        <FormattedMessage id="advance-voting-station.found" description="Vote before polling day" />
      </h2>
      <p>
        <FormattedMessage
          id="advance-voting-station.your-station"
          description="Your advanced voting station"
        />
      </p>
      <address data-testid="advanced-voting-station-address" className="address">
        <p>
          {props.advance_voting_station.name}
          <br />
          {splitAddress.slice(0, splitAddress.length - 1)}
          <br />
          {props.advance_voting_station.postcode}
        </p>
      </address>

      {advanceVotingTimesTable}

      {props.advance_voting_station.coordinates && (
        <Directions
          origin={props.advance_voting_station.coordinates[0]}
          destination={props.advance_voting_station.coordinates[1]}
        />
      )}

      <Notifications list={props.notifications} />
    </section>
  );
}

export default AdvanceVoting;
