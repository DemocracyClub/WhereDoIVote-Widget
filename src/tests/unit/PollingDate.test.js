import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import PollingDate from '../../PollingDate';
import en_messages from '../../translations/en';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./dc-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

jest.mock(`!!raw-loader!./ec-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

const oneBallot = {
  date: '2020-05-07',
  ballots: [
    {
      ballot_paper_id: 'local.westminster.lancaster-gate.by.2020-05-07',
      ballot_title: 'Westminster local election Lancaster Gate by-elections',
      cancelled: false,
      election_id: 'local.westminster.2020-05-07',
      candidates_verified: false,
      candidates: [],
    },
  ],
};

function twoBallots() {
  let tb = Object.assign({}, oneBallot);
  tb.ballots = oneBallot.ballots.slice(0);
  tb.ballots.push({
    ballot_paper_id: 'gla.a.2020-05-07',
    ballot_title: 'Greater London Assembly elections (Additional)',
    cancelled: false,
    election_id: 'gla.a.2020-05-07',
    candidates_verified: false,
    candidates: [],
  });
  return tb;
}

describe('PollingDate: Single English one ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    let date = oneBallot;

    const element = renderWithReactIntl(
      <PollingDate locale="en" messages={en_messages} single={true} date={date} />
    );
    getByTestId = element.getByTestId;
  });
  it('should display the election date as a title when there is only one date', async () => {
    const DateHeading = await waitForElement(() => getByTestId('title-date-2020-05-07'));
    expect(DateHeading).toHaveTextContent('Thursday, May 7, 2020');
  });
});

describe('PollingDate: Single Welsh one ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    let d1 = oneBallot;

    const element = renderWithReactIntl(
      <PollingDate locale="cy" messages={en_messages} single={true} date={d1} />
    );
    getByTestId = element.getByTestId;
  });
  it('should display the election date formatted nicely in Welsh', async () => {
    const DateHeading = await waitForElement(() => getByTestId('title-date-2020-05-07'));
    expect(DateHeading).toHaveTextContent('Dydd Iau, 7 Mai 2020');
  });
});

describe('PollingDate: Single English two ballots', () => {
  let getByTestId;
  beforeEach(async () => {
    let d2 = twoBallots();
    const element = renderWithReactIntl(
      <PollingDate locale="en" messages={en_messages} single={true} date={d2} />
    );
    getByTestId = element.getByTestId;
  });
  it('should tell the user they will have two ballots to fill out', async () => {
    const PollDate = await waitForElement(() => getByTestId('date-2020-05-07'));
    expect(PollDate).toHaveTextContent('two ballot papers');
  });
});

describe('PollingDate: Single English two ballots one cancelled', () => {
  let getByTestId;
  beforeEach(async () => {
    let d4 = twoBallots();
    d4.ballots[1].cancelled = true;
    const element = renderWithReactIntl(
      <PollingDate locale="en" messages={en_messages} single={true} date={d4} />
    );
    getByTestId = element.getByTestId;
  });
  it('should tell the user they will have one ballot to fill out', async () => {
    const PollDate = await waitForElement(() => getByTestId('date-2020-05-07'));
    expect(PollDate).toHaveTextContent('one ballot paper');
  });
});

describe('PollingDate: Multiple English two ballots', () => {
  let getByTestId;
  beforeEach(async () => {
    let d5 = twoBallots();
    const element = renderWithReactIntl(
      <PollingDate locale="en" messages={en_messages} single={false} date={d5} />
    );
    getByTestId = element.getByTestId;
  });
  it('should include the election date as part of the descriptive content', async () => {
    const PollDate = await waitForElement(() => getByTestId('date-2020-05-07'));
    expect(PollDate).toHaveTextContent('On Thursday, May 7, 2020 you will have two ballot papers');
  });
});
