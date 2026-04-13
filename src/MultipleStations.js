import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Directions } from './Directions';
import { formatDate } from './utils';

function PollingStation(props) {
  const { locale } = useIntl();

  let splitAddress = [];

  props.station.address.split(',').forEach(function (line, index) {
    if (line.trim()) {
      splitAddress.push(line.trim());
      splitAddress.push(<br key={index} />);
    }
  });

  let timeTable = (
    <div className="ds-table">
      <table>
        <thead></thead>
        <caption>
          <FormattedMessage id="alt-voting-station.opening-hours" />
        </caption>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="alt-voting-station.date" description="Date" />
            </th>
            <th>
              <FormattedMessage id="alt-voting-station.open" description="Open" />
            </th>
          </tr>

          {props.station.opening_times.map((opening_time, index) => {
            const date = new Date(opening_time[0]);
            const dayMonthYear = formatDate(date, locale);
            const openingTime = opening_time[1].substring(0, 5);
            const closingTime = opening_time[2].substring(0, 5);
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
    <section>
      <address className="address">
        <p>{splitAddress.slice(0, splitAddress.length - 1)}</p>
      </address>

      {props.station.location && (
        <Directions origin={props.originPoint} destination={props.station.location} />
      )}

      {timeTable}
    </section>
  );
}

function AdvanceVotingStations(props) {
  return (
    <>
      <p>
        {/*
          Not translated because 2026 pilots are England only
          Review if we do this again
        */}
        Your council is trialling a system that allows you to vote in person before polling day. You
        can vote in advance at one of these locations, or vote at your assigned polling station as
        normal on polling day.
      </p>
      <h3 className="eiw-secondary-header" data-testid="advance-voting-station">
        <FormattedMessage id="alt-voting-station.found" description="Vote before polling day" />
      </h3>
      {props.stations.map((station, index) => (
        <PollingStation key={index} station={station} originPoint={props.originPoint} />
      ))}
    </>
  );
}

function PollingDayVotingStations(props) {
  return (
    <>
      <p>
        {/*
          Not translated because 2026 pilots are England only
          Review if we do this again
        */}
        Your council is trialling a system that allows you to vote in person at either your assigned
        station or a central voting hub.
      </p>
      <h3 className="eiw-secondary-header">
        <FormattedMessage id="station.your-station" />
      </h3>
      {props.stations.map((station, index) => (
        <PollingStation key={index} station={station} originPoint={props.originPoint} />
      ))}
    </>
  );
}

export { AdvanceVotingStations, PollingDayVotingStations };
