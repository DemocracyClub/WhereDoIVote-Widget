import { waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Widget', () => {
  let getByLabelText, getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByLabelText = wrapper.getByLabelText;
    getByTestId = wrapper.getByTestId;
  });

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const ErrorMessage = await waitForElement(() => document.querySelector('#dc_error'));

    expect(ErrorMessage).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should give error message malformed postcode is entered', async () => {
    let enteredPostcode = 'aaaa';
    typePostcode(enteredPostcode);
    submitPostcode();
    const ErrorMessage = await waitForElement(() => document.querySelector('#dc_error'));
    expect(ErrorMessage).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
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

  it('should handle incorrect but correctly formatted postcodes gracefully', async () => {
    let enteredPostcode = 'AA99AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const errorResponse = await waitForElement(() => document.querySelector('.ErrorMessage'));

    expect(errorResponse).toHaveTextContent(en_messages['api.errors.generic-error']);
  });

  it('should load address picker if multiple addresses returned', async () => {
    let enteredPostcode = 'TN48XA';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();

    const firstAddressPickerOption = await waitForElement(() =>
      document.querySelector('#id_address option:first-child')
    );
    expect(firstAddressPickerOption).toHaveTextContent('1 LANGTON ROAD, TUNBRIDGE WELLS');
  });

  it('should show polling station for address chosen from picker', async () => {
    let enteredPostcode = 'TN48XA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const rusthall = await waitForElement(() =>
      document.querySelector('#id_address option:nth-child(27)')
    );
    fireEvent.change(getByTestId('address-select'), {
      target: { value: rusthall.innerHTML },
    });
    const button = await waitForElement(() => getByTestId('address-button'));
    let addressId = '10000066465';
    mockResponse('address', addressId);
    fireEvent.click(button);
    const pollingStation = await waitForElement(() => document.querySelector('.PollingStation'));
    expect(pollingStation).toHaveTextContent('Your polling station');
  });
});

describe('DemocracyClubWidget Accessibility', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should include an h1 at the top level of the postcode selector', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let label = `<h1><label class="form-label-bold" for="postcode">`;
    expect(PostcodeForm).toContainHTML(label);
  });

  it('should accept Enter instead of clicking the button', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let button = `<button class="dc-btn-primary" type="submit">${en_messages['postcode.submit-postcode']}</button>`;
    expect(PostcodeForm).toContainHTML(button);
  });
  it('should have a "for" attribute on the postcode form label', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let label = `<label class="form-label-bold" for="postcode">`;
    expect(PostcodeForm).toContainHTML(label);
  });
});
