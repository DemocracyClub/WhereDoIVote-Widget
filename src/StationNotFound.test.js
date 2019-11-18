import '@testing-library/jest-dom/extend-expect';
import { cleanup, act, waitForElement } from '@testing-library/react';
import en_messages from './translations/en';
import { renderWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Polling station unknown', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should show a station not found page for unknown polling stations', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let stationNotFound = await waitForElement(() => getByTestId('station-not-found'));
    expect(stationNotFound).toHaveTextContent(en_messages['station.not-found']);
  });
});

describe('Polling station unknown accessibility', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should show a station not found page for unknown polling stations', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let stationNotFound = await waitForElement(() => getByTestId('station-not-found'));
    const accessibleTitle = `<h1 class="dc-header">We couldn't find your station</h1>`;
    expect(stationNotFound).toContainHTML(accessibleTitle);
  });
});
