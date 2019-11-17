import '@testing-library/jest-dom/extend-expect';
import { cleanup, waitForElement, fireEvent } from '@testing-library/react';
import {
  renderCandidatesWidget,
  renderCandidatesUntickedWidget,
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
  it('should not show candidate option on the default widget', async () => {
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).not.toHaveTextContent('Show candidates');
  });
});

describe('Candidates Unticked Widget', () => {
  beforeEach(() => {
    renderCandidatesUntickedWidget();
  });
  it('should show candidate option on the default widget', async () => {
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).toHaveTextContent('Show candidates');
  });
  it('should not show candidates for a postcode if option to do so is unticked', async () => {
    let enteredPostcode = 'UB78FA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).not.toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });
  it('should show candidates for a postcode if option to do so is ticked', async () => {
    let enteredPostcode = 'UB78FA';
    fireEvent.click(document.querySelector('input[name="showCandidates"]'));
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });
});

describe('Candidates', () => {
  let getByTestId;
  beforeEach(() => {
    const widget = renderCandidatesWidget();
    getByTestId = widget.getByTestId;
  });

  it('should show candidate option if candidates are enabled', async () => {
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).toHaveTextContent('Show candidates');
  });

  it('should show candidates for a postcode if option to do so is ticked', async () => {
    let enteredPostcode = 'UB78FA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Candidates = await waitForElement(() => getByTestId('candidates'));
    expect(Candidates).toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });

  it('should not show candidates for a postcode if option to do so is unticked', async () => {
    let enteredPostcode = 'UB78FA';
    fireEvent.click(document.querySelector('input[name="showCandidates"]'));
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.DemocracyClubWidget'));
    expect(Widget).not.toHaveTextContent('Candidates for Uxbridge and South Ruislip');
  });

  it('should not show candidates for a postcode if the general election id is not present on the ballot', async () => {
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
