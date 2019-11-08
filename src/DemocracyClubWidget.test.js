import { waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import cy_messages from './translations/cy';
import en_messages from './translations/en';
import {
  renderWelshWidget,
  renderEnglishWidget,
  typePostcode,
  submitPostcode,
  mockResponse,
} from './test-utils/test';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Welsh Widget', () => {
  beforeEach(async () => {
    renderWelshWidget();
  });

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#dc_error'));

    expect(newContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });

  it('should give error message malformed postcode is entered', async () => {
    let enteredPostcode = 'aaaa';
    typePostcode(enteredPostcode);
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#dc_error'));
    expect(newContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });
});

describe('WhereDoIVote English Widget', () => {
  let getByLabelText, getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByLabelText = wrapper.getByLabelText;
    getByTestId = wrapper.getByTestId;
  });

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#dc_error'));

    expect(newContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should give error message malformed postcode is entered', async () => {
    let enteredPostcode = 'aaaa';
    typePostcode(enteredPostcode);
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#dc_error'));
    expect(newContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should allow user to start again', async () => {
    let enteredPostcode = 'AA11AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    await waitForElement(() => document.querySelector('.NoUpcomingElection'));
    fireEvent.click(getByLabelText(en_messages['general.start-again']));
    const EnterPostcode = await waitForElement(() => getByTestId('postcode-selector'));
    expect(EnterPostcode).toHaveTextContent(en_messages['postcode.enter-postcode']);
  });
});
