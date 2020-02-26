import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import Election from '../../Election';
import en_messages from '../../translations/en';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
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

describe('Election: Single English one ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    let date = oneBallot;

    const electionItem = renderWithReactIntl(
      <Election locale="en" messages={en_messages} single={true} election={date} />
    );
    getByTestId = electionItem.getByTestId;
  });
  it('should display the election date as a title when there is only one election', async () => {
    const ElectionHeading = await waitForElement(() => getByTestId('title-election-2020-05-07'));
    expect(ElectionHeading).toHaveTextContent('Thursday, May 7, 2020');
  });
});

describe('Election: Single Welsh one ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    let d1 = oneBallot;

    const electionItem = renderWithReactIntl(
      <Election locale="cy" messages={en_messages} single={true} election={d1} />
    );
    getByTestId = electionItem.getByTestId;
  });
  it('should display the election date formatted nicely in Welsh', async () => {
    const ElectionHeading = await waitForElement(() => getByTestId('title-election-2020-05-07'));
    expect(ElectionHeading).toHaveTextContent('Dydd Iau, 7 Mai 2020');
  });
});

describe('Election: Single English two ballots', () => {
  let getByTestId;
  beforeEach(async () => {
    let d2 = twoBallots();
    const electionItem = renderWithReactIntl(
      <Election locale="en" messages={en_messages} single={true} election={d2} />
    );
    getByTestId = electionItem.getByTestId;
  });
  it('should tell the user they will have two ballots to fill out', async () => {
    const Election = await waitForElement(() => getByTestId('election-2020-05-07'));
    expect(Election).toHaveTextContent('two ballot papers');
  });
});

describe('Election: Single English two ballots one cancelled', () => {
  let getByTestId;
  beforeEach(async () => {
    let d4 = twoBallots();
    d4.ballots[1].cancelled = true;
    const electionItem = renderWithReactIntl(
      <Election locale="en" messages={en_messages} single={true} election={d4} />
    );
    getByTestId = electionItem.getByTestId;
  });
  it('should tell the user they will have one ballot to fill out', async () => {
    const Election = await waitForElement(() => getByTestId('election-2020-05-07'));
    expect(Election).toHaveTextContent('one ballot paper');
  });
});

describe('Election: Multiple English two ballots', () => {
  let getByTestId;
  beforeEach(async () => {
    let d5 = twoBallots();
    const electionItem = renderWithReactIntl(
      <Election locale="en" messages={en_messages} single={false} election={d5} />
    );
    getByTestId = electionItem.getByTestId;
  });
  it('should include the election date as part of the descriptive content', async () => {
    const Election = await waitForElement(() => getByTestId('election-2020-05-07'));
    expect(Election).toHaveTextContent('On Thursday, May 7, 2020 you will have two ballot papers');
  });
});
