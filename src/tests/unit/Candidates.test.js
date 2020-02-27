import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import Candidates from '../../Candidates';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

const listBallot = {
  ballot_paper_id: 'gla.a.2020-05-07',
  election_id: 'gla.a.2020-05-07',
  candidates: [
    {
      party: { party_id: 'party:90', party_name: 'Liberal Democrats' },
    },
    {
      party: { party_id: 'party:2755', party_name: "Women's Equality Party" },
    },
  ],
};

const normalBallot = {
  ballot_paper_id: 'local.westminster.lancaster-gate.by.2018-11-22',
  ballot_title: 'Westminster local election Lancaster Gate by-election',
  election_id: 'local.westminster.2018-11-22',
  election_name: 'Westminster local election',
  post_name: 'Lancaster Gate',
  candidates_verified: true,
  candidates: [
    {
      list_position: null,
      party: {
        party_id: 'party:90',
        party_name: 'Liberal Democrats',
      },
      person: {
        ynr_id: 42252,
        name: 'Sally Elizabeth Gray',
        absolute_url: 'https://whocanivotefor.co.uk/person/42252/sally-elizabeth-gray',
      },
    },
    {
      list_position: null,
      party: {
        party_id: 'party:63',
        party_name: 'Green Party',
      },
      person: {
        ynr_id: 7505,
        name: 'Zack Polanski',
        absolute_url: 'https://whocanivotefor.co.uk/person/7505/zack-polanski',
      },
    },
  ],
};

describe('Candidates: List Ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    const CandidatesComponent = renderWithReactIntl(<Candidates locale="en" ballot={listBallot} />);
    getByTestId = CandidatesComponent.getByTestId;
  });
  it('Should display a message saying that parties are the candidates', async () => {
    const CandidatesComponent = await waitForElement(() => getByTestId('candidates'));
    expect(CandidatesComponent).toHaveTextContent(
      'You will vote for your preferred party rather than a candidate on this ballot paper'
    );
  });
});

describe('Candidates: Normal Ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    const CandidatesComponent = renderWithReactIntl(
      <Candidates locale="en" ballot={normalBallot} />
    );
    getByTestId = CandidatesComponent.getByTestId;
  });
  it('Should display a list of the candidates', async () => {
    const CandidatesComponent = await waitForElement(() => getByTestId('candidates'));
    expect(CandidatesComponent).toHaveTextContent('Sally Elizabeth Gray');
    expect(CandidatesComponent).toHaveTextContent('Zack Polanski');
  });
});
