import { fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import cy_messages from './translations/cy';
import {
  renderWelshToggleableWidget,
  renderEnglishToggleableWidget,
  submitPostcode,
} from './test-utils/test';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Toggleable English Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = renderEnglishToggleableWidget();
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  function chooseLanguage(locale) {
    fireEvent.click(getByTestId(`${locale}-selector`));
  }

  it('should let you translate the widget to Welsh', async () => {
    chooseLanguage('cy');
    submitPostcode();
    const translatedContent = await waitForElement(() => document.querySelector('#dc_error'));
    expect(translatedContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });

  it('should let you translate the widget to Welsh and back to English again', async () => {
    chooseLanguage('cy');
    submitPostcode();
    chooseLanguage('en');
    const translatedContent = await waitForElement(() => container.querySelector('#dc_error'));
    expect(translatedContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });
});

describe('WhereDoIVote Toggleable Welsh Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = renderWelshToggleableWidget();
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  function chooseLanguage(locale) {
    fireEvent.click(getByTestId(`${locale}-selector`));
  }

  it('should let you translate the widget to English', async () => {
    chooseLanguage('en');
    submitPostcode();
    const translatedContent = await waitForElement(() => document.querySelector('#dc_error'));
    expect(translatedContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should let you translate the widget to English and back to Welsh again', async () => {
    chooseLanguage('en');
    submitPostcode();
    chooseLanguage('cy');
    const translatedContent = await waitForElement(() => container.querySelector('#dc_error'));
    expect(translatedContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });
});
