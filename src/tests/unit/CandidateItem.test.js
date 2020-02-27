import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import CandidateItem from '../../CandidateItem';
import en_messages from '../../translations/en';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Candidate item', () => {
  let getByTestId;
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

    const candidateItem = renderWithReactIntl(<CandidateItem candidate={candidate} />);
    getByTestId = candidateItem.getByTestId;
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
  it('renders an accessible title attribute on each hyperlink', async () => {
    const CandidateLink = await waitForElement(() => getByTestId('candidate-link'));
    expect(CandidateLink).toHaveAttribute('title', en_messages['general.read-more-info-candidate']);
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
    renderWithReactIntl(<CandidateItem candidate={coopParty} />);
  });
  it('renders correct class for cooperative party', async () => {
    const PartyName = await waitForElement(() => document.querySelector('.party-name'));
    expect(PartyName).toHaveClass('party-53-119');
  });
});
