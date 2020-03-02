import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { candidate, normalBallot, listBallot } from '../utils/common-responses';
import { cleanup, waitForElement } from '@testing-library/react';
import en_messages from '../../translations/en';
import Ballot from '../../Ballot';
import Candidates from '../../Candidates';
import CandidateItem from '../../CandidateItem';
import BallotTypeList from '../../BallotTypeList';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Candidates Component: List Ballot', () => {
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

describe('Candidates Component: Normal Ballot', () => {
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

describe('CandidateItem Component', () => {
  let getByTestId;
  beforeEach(async () => {
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

describe('CandidateItem Component edge case', () => {
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

describe('Ballot Component', () => {
  it('should show candidates if candidates_verified is true', async () => {
    const BallotWrapper = renderWithReactIntl(
      <Ballot enableCandidates={true} ballot={normalBallot} />
    );
    const BallotComponent = await waitForElement(() =>
      BallotWrapper.getByTestId(normalBallot.ballot_paper_id)
    );
    expect(BallotComponent).toHaveTextContent('Show candidates');
  });
  it("shouldn't show candidates if candidates_verified is false", async () => {
    const unverifiedCandidatesBallot = Object.assign({}, normalBallot);
    unverifiedCandidatesBallot.candidates_verified = false;
    const BallotWrapper = renderWithReactIntl(
      <Ballot enableCandidates={true} ballot={unverifiedCandidatesBallot} />
    );
    const BallotComponent = await waitForElement(() =>
      BallotWrapper.getByTestId(normalBallot.ballot_paper_id)
    );
    expect(BallotComponent).not.toHaveTextContent('Show candidates');
  });
});

describe('BallotTypeList Component', () => {
  let getByTestId;
  beforeEach(async () => {
    const BallotItem = renderWithReactIntl(<BallotTypeList locale="en" ballot={listBallot} />);
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
