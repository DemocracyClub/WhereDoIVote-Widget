import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement, render } from '@testing-library/react';
import CandidateItem from './CandidateItem';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Candidate item', () => {
  beforeEach(async () => {
    let candidate = {
      list_position: null,
      party: { party_id: 'ynmp-party:2', party_name: 'Independent' },
      person: {
        ynr_id: 72363,
        name: 'Example Name',
        absolute_url: 'https://whocanivotefor.co.uk/person/72363/count-binface',
        email: null,
        photo_url:
          'https://static-candidates.democracyclub.org.uk/media/cache/18/eb/18eb26d2f07e4275ba247371e35d8eb5.jpg',
      },
    };
    render(<CandidateItem candidate={candidate} />);
  });
  it('renders name for a given candidate', async () => {
    const CandidateItem = await waitForElement(() => document.querySelector('.CandidateItem'));
    expect(CandidateItem).toHaveTextContent('Example Name');
  });
  it('renders party for a given candidate', async () => {
    const CandidateItem = await waitForElement(() => document.querySelector('.CandidateItem'));
    expect(CandidateItem).toHaveTextContent('Independent');
  });
  it('renders correct class for party with standard ID', async () => {
    const PartyName = await waitForElement(() => document.querySelector('.party-name'));
    expect(PartyName).toHaveClass('party-2');
  });
});

describe('Candidate item edge case', () => {
  beforeEach(async () => {
    let coopParty = {
      list_position: null,
      party: { party_id: 'joint-party:53-119', party_name: 'Labour Party (joint Co-op)' },
      person: {
        ynr_id: 7292,
        name: 'Example Name',
        absolute_url: 'https://whocanivotefor.co.uk/person/7292/bobby-elmo-smith',
        email: 'example@example.com',
        photo_url:
          'https://static-candidates.democracyclub.org.uk/media/cache/bf/a8/bfa88a4a561f6d3fb026e3248255d430.jpg',
      },
    };
    render(<CandidateItem candidate={coopParty} />);
  });
  it('renders correct class for cooperative party', async () => {
    const PartyName = await waitForElement(() => document.querySelector('.party-name'));
    expect(PartyName).toHaveClass('party-53-119');
  });
});
