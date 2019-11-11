import { cleanup, waitForElement } from '@testing-library/react';
import cy_messages from './translations/cy';
import '@testing-library/jest-dom/extend-expect';

import { renderWelshWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Notifications', () => {
  let getByTestId;

  beforeEach(async () => {
    const wrapper = renderWelshWidget();
    getByTestId = wrapper.getByTestId;
  });
  it('should show voter ID requirement for DE13GB', async () => {
    let enteredPostcode = 'DE13GB';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const notificationContainer = await waitForElement(() =>
      document.querySelector('.PollingStation article')
    );
    expect(notificationContainer).toHaveTextContent('You need to show ID to vote at this election');
  });

  it('should show an uncontested election for SS30AA', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const notification = await waitForElement(() => getByTestId('notification'));
    expect(notification).toHaveTextContent('Uncontested Election');
  });
  it('does not show notification when there is no voter id pilot', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    let notification = document.querySelector('.Notification');
    expect(YourPollingStation).toHaveTextContent(cy_messages['station.your-station']);
    expect(notification).toBe(null);
  });
});
