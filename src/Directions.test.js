import { waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Directions', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('renders Google Maps only when no origin present', async () => {
    let enteredPostcode = 'AA22AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleMaps = await waitForElement(() => getByTestId('google-maps'));
    expect(GoogleMaps).toHaveTextContent(en_messages['directions.show-google-maps']);
  });

  it('renders Google Directions only when destination and origin present', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-directions'));
    expect(GoogleDirections).toHaveTextContent(en_messages['directions.show-google-directions']);
  });

  it('does not render out directions when coordinates are not present', async () => {
    let enteredPostcode = 'AA21AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    expect(YourPollingStation).toHaveTextContent(en_messages['station.your-station']);
    let GoogleButton = document.querySelector('.dc-btn-primary');
    expect(GoogleButton).toBe(null);
  });
});

describe('Directions Accessibility', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    getByTestId = wrapper.getByTestId;
  });
  it('includes descriptive titles on Google Directions link', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-directions'));
    expect(GoogleDirections).toHaveAttribute(
      'title',
      en_messages['directions.show-google-directions-title']
    );
  });
  it('includes descriptive titles on Google Maps link', async () => {
    let enteredPostcode = 'AA22AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-maps'));
    expect(GoogleDirections).toHaveAttribute(
      'title',
      en_messages['directions.show-google-maps-title']
    );
  });
});
