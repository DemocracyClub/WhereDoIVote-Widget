import '@testing-library/jest-dom/extend-expect';
import { cleanup, waitForElement } from '@testing-library/react';
import {
  renderCandidatesWidget,
  renderWidget,
  typePostcode,
  submitPostcode,
  mockResponse,
} from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Standard Widget', () => {
  beforeEach(() => {
    renderWidget();
  });
  it('should not show candidates on the default widget', async () => {
    let enteredPostcode = 'UB78FA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('DemocracyClubWidget'));
    expect(Widget).not.toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });
});

describe('Candidates', () => {
  let getByTestId;
  beforeEach(() => {
    const widget = renderCandidatesWidget();
    getByTestId = widget.getByTestId;
  });

  it('should show candidates section for a postcode', async () => {
    let enteredPostcode = 'UB78FA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Candidates = await waitForElement(() => getByTestId('candidates'));
    expect(Candidates).toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });

  it('should only show candidates for ballots with id parl.2019-12-12', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).not.toHaveTextContent(
      'Candidates for Westminster local election Lancaster Gate by-election'
    );
  });
});
