import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { candidate, candidateListBallot, partyListBallot } from '../utils/common-responses';
import { cleanup, waitForElement, fireEvent } from '@testing-library/react';
import en_messages from '../../translations/en';
import Ballot from '../../Ballot';
import Candidates from '../../Candidates';
import CandidateList from '../../CandidateList';
import PartyList from '../../PartyList';
import { renderWithReactIntl } from '../utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Candidates Component: List Ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    const CandidatesWrapper = renderWithReactIntl(<Candidates ballot={partyListBallot} />);
    getByTestId = CandidatesWrapper.getByTestId;
  });
  it('Should display a message saying that parties are the candidates', async () => {
    const CandidatesComponent = await waitForElement(() => getByTestId('candidates'));
    expect(CandidatesComponent).toHaveTextContent(en_messages['ballots.list-type-message']);
  });
});

describe('Candidates Component: Normal Ballot', () => {
  let getByTestId;
  beforeEach(async () => {
    const CandidatesWrapper = renderWithReactIntl(<Candidates ballot={candidateListBallot} />);
    getByTestId = CandidatesWrapper.getByTestId;
  });
  it('Should display a list of the candidates', async () => {
    const CandidatesComponent = await waitForElement(() => getByTestId('candidates'));
    expect(CandidatesComponent).toHaveTextContent('Sally Elizabeth Gray');
    expect(CandidatesComponent).toHaveTextContent('Zack Polanski');
  });
});

describe('CandidateList Component', () => {
  let getByTestId;
  beforeEach(async () => {
    const CandidateListWrapper = renderWithReactIntl(<CandidateList candidates={[candidate]} />);
    getByTestId = CandidateListWrapper.getByTestId;
  });
  it('renders name for a given candidate', async () => {
    const CandidateListItem = await waitForElement(() =>
      document.querySelector('.CandidateListItem')
    );
    expect(CandidateListItem).toHaveTextContent(candidate.person.name);
  });
  it('renders party for a given candidate', async () => {
    const CandidateListItem = await waitForElement(() =>
      document.querySelector('.CandidateListItem')
    );
    expect(CandidateListItem).toHaveTextContent(candidate.party.party_name);
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

describe('CandidateList Component edge cases', () => {
  it('renders correct class for cooperative party', async () => {
    let coopPartyCandidate = Object.assign({}, candidate);
    coopPartyCandidate.party.party_id = 'joint-party:53-119';
    coopPartyCandidate.party.party_name = 'Labour Party (joint Co-op)';
    renderWithReactIntl(<CandidateList candidates={[coopPartyCandidate]} />);
    const PartyName = await waitForElement(() => document.querySelector('.party-name'));
    expect(PartyName).toHaveClass('party-53-119');
  });
});

describe('Ballot Component', () => {
  it('should show candidates if candidates_verified is true', async () => {
    const BallotWrapper = renderWithReactIntl(
      <Ballot enableElections={true} ballot={candidateListBallot} />
    );
    const BallotComponent = await waitForElement(() =>
      BallotWrapper.getByTestId(candidateListBallot.ballot_paper_id)
    );
    expect(BallotComponent).toHaveTextContent('Show candidates');
  });
  it("shouldn't show candidates if candidates_verified is false", async () => {
    const unverifiedCandidatesBallot = Object.assign({}, candidateListBallot);
    unverifiedCandidatesBallot.candidates_verified = false;
    const BallotWrapper = renderWithReactIntl(
      <Ballot enableElections={true} ballot={unverifiedCandidatesBallot} />
    );
    const BallotComponent = await waitForElement(() =>
      BallotWrapper.getByTestId(candidateListBallot.ballot_paper_id)
    );
    expect(BallotComponent).not.toHaveTextContent('Show candidates');
  });
});

describe('Ballot Component: Candidates drop-down accessibility', () => {
  let getByTestId;
  beforeEach(async () => {
    const BallotWrapper = renderWithReactIntl(<Ballot ballot={candidateListBallot} />);
    getByTestId = BallotWrapper.getByTestId;
  });

  it('Toggle candidates button should have aria-expanded attribute', async () => {
    const ToggleButton = await waitForElement(() =>
      getByTestId(`show-candidates-button-${candidateListBallot.ballot_paper_id}`)
    );
    expect(ToggleButton).toHaveAttribute('aria-expanded');
  });
  it('Aria-expanded attr should default to false', async () => {
    const ToggleButton = await waitForElement(() =>
      getByTestId(`show-candidates-button-${candidateListBallot.ballot_paper_id}`)
    );
    expect(ToggleButton).toHaveAttribute('aria-expanded', 'false');
  });
  it('Clicking button should set aria-expanded to true', async () => {
    const ToggleButton = await waitForElement(() =>
      getByTestId(`show-candidates-button-${candidateListBallot.ballot_paper_id}`)
    );
    await fireEvent.click(ToggleButton);
    expect(ToggleButton).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('PartyList Component', () => {
  let getByTestId;
  beforeEach(async () => {
    const BallotWrapper = renderWithReactIntl(<PartyList locale="en" ballot={partyListBallot} />);
    getByTestId = BallotWrapper.getByTestId;
  });
  it('Should display a message saying that parties are the candidates', async () => {
    const paraItem = await waitForElement(() => getByTestId('para-gla.a.2020-05-07'));
    expect(paraItem).toHaveTextContent(en_messages['ballots.list-type-message']);
  });
  it('Should derive list of parties from candidate data', async () => {
    const ulItem = await waitForElement(() => getByTestId('ul-gla.a.2020-05-07'));
    expect(ulItem).toHaveTextContent("Women's Equality Party");
    expect(ulItem).toHaveTextContent('Liberal Democrats');
    expect(ulItem).not.toHaveTextContent('Green Party');
  });
});
