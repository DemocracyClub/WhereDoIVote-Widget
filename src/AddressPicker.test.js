import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, waitForElement } from '@testing-library/react';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Address picker', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
  });
  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#dc_error'));
    expect(newContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });
  it('should load address picker if multiple addresses returned', async () => {
    let enteredPostcode = 'TN48XA';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();

    const firstDatePickerOption = await waitForElement(() =>
      document.querySelector('#id_address option:first-child')
    );
    expect(firstDatePickerOption).toHaveTextContent('1 LANGTON ROAD, TUNBRIDGE WELLS');
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
