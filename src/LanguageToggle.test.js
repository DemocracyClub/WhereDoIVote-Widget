import React from 'react';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import cy_messages from './translations/cy';
import DemocracyClubWidget from './DemocracyClubWidget';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = render(<DemocracyClubWidget />);
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  function chooseLanguage(locale) {
    fireEvent.click(getByTestId(`${locale}-selector`));
  }

  function submitPostcode() {
    act(() => {
      fireEvent.submit(getByTestId('postcode-selector'));
    });
  }

  it('should let you translate the widget to Welsh', async () => {
    chooseLanguage('cy');
    submitPostcode();
    const translatedContent = await waitForElement(() => container.querySelector('#dc_error'));
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
