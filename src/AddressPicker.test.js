import '@testing-library/jest-dom/extend-expect';
import { cleanup, waitForElement } from '@testing-library/react';
import en_messages from './translations/en';
import { renderWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Address picker', () => {
  beforeEach(async () => {
    renderWidget();
  });

  it('renders "My address is not in the list" option', async () => {
    let enteredPostcode = 'TN48XA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();

    const lastAddressPickerOption = await waitForElement(() =>
      document.querySelector('#id_address option:last-child')
    );
    expect(lastAddressPickerOption).toHaveTextContent(en_messages['address.not-in-list']);
  });
});
