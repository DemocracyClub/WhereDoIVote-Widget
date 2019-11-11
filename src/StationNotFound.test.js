import '@testing-library/jest-dom/extend-expect';
import { cleanup, act, waitForElement } from '@testing-library/react';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Polling station unknown', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
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

  it("should present council to get in touch with when station isn't found", async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let councilDetails = await waitForElement(() => getByTestId('council-details'));
    expect(councilDetails).toHaveTextContent(en_messages['general.website']);
    expect(councilDetails).toHaveTextContent(en_messages['general.phone']);
    expect(councilDetails).toHaveTextContent(en_messages['general.email']);
  });
});
