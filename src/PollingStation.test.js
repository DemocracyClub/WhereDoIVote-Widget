import { waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('PollingStation', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('shows a title if it finds a polling station', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    expect(YourPollingStation).toHaveTextContent(en_messages['station.your-station']);
  });

  it('renders address', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const StationAddress = await waitForElement(() => getByTestId('address'));
    expect(StationAddress).toHaveTextContent('York Room');
  });
});
