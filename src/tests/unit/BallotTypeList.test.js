import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import BallotTypeList from '../../BallotTypeList';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

const ballot = {
  ballot_paper_id: 'gla.a.2020-05-07',
  candidates: [
    {
      list_position: 9,
      party: { party_id: 'party:90', party_name: 'Liberal Democrats' },
      person: {},
    },
    {
      list_position: null,
      party: { party_id: 'party:2755', party_name: "Women's Equality Party" },
      person: {},
    },
    {
      list_position: 5,
      party: { party_id: 'party:90', party_name: 'Liberal Democrats' },
      person: {},
    },
    {
      list_position: 1,
      party: { party_id: 'party:90', party_name: 'Liberal Democrats' },
      person: {},
    },
    {
      list_position: null,
      party: { party_id: 'party:2755', party_name: "Women's Equality Party" },
      person: {},
    },
  ],
};

describe('BallotTypeList', () => {
  let getByTestId;
  beforeEach(async () => {
    const BallotItem = renderWithReactIntl(<BallotTypeList locale="en" ballot={ballot} />);
    getByTestId = BallotItem.getByTestId;
  });
  it('Should display a message saying that parties are the candidates', async () => {
    const paraItem = await waitForElement(() => getByTestId('para-gla.a.2020-05-07'));
    expect(paraItem).toHaveTextContent(
      'You will vote for your preferred party rather than a candidate on this ballot paper'
    );
  });
  it('Should derive list of parties from candidate data', async () => {
    const ulItem = await waitForElement(() => getByTestId('ul-gla.a.2020-05-07'));
    expect(ulItem).toHaveTextContent("Women's Equality Party");
    expect(ulItem).toHaveTextContent('Liberal Democrats');
    expect(ulItem).not.toHaveTextContent('Green Party');
  });
});
