import '@testing-library/jest-dom/extend-expect';
import { cleanup, act, waitForElement } from '@testing-library/react';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Electoral Services', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
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

  it('should present NI Electoral Office for N09 postcodes', async () => {
    let enteredPostcode = 'AA15AA';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const results = await waitForElement(() => getByTestId('station-not-found'));
    expect(results).toHaveTextContent(
      'Get in touch with The Electoral Office for Northern Ireland'
    );
  });
});
