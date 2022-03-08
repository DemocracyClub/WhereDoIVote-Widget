import React from 'react';
import ElectionInformationWidget from '../../ElectionInformationWidget';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider, createIntl } from 'react-intl';
import axiosMock from 'axios';
import fs from 'fs';
import messages_en from '../../translations/en';

export const childAttributeChecker = (shallowComponent) => (selector, attribute) => {
  return shallowComponent.find(selector).first().html().indexOf(attribute) ? true : false;
};

export const renderWithReactIntl = (component) => {
  const intl = createIntl({
    locale: 'en',
    defaultLocale: 'en',
  });
  let componentWithIntl = React.cloneElement(component, { intl });
  return render(
    <IntlProvider locale="en" messages={messages_en}>
      {componentWithIntl}
    </IntlProvider>
  );
};

export const typePostcode = (postcode) => {
  fireEvent.change(document.querySelector('#postcode'), {
    target: { value: postcode },
  });
};

export const submitPostcode = () => {
  fireEvent.submit(document.querySelector('.PostcodeSelector'));
};

export const mockResponse = (endpoint, param) => {
  const content = fs.readFileSync(`./public/example-responses/${endpoint}-${param}.json`);
  axiosMock.get.mockResolvedValueOnce({
    data: JSON.parse(content),
  });
};

export const renderWidget = () => {
  render(<div id="dc_wdiv" aria-live="polite" role="region" />);
  const wrapper = render(<ElectionInformationWidget />);
  return wrapper;
};

export const renderWelshWidget = () => {
  render(<div id="dc_wdiv" data-language="cy" aria-live="polite" role="region" />);
  const wrapper = render(<ElectionInformationWidget />);
  return wrapper;
};

export const renderEnglishWidget = () => {
  render(<div id="dc_wdiv" data-language="en" aria-live="polite" role="region" />);
  const wrapper = render(<ElectionInformationWidget />);
  return wrapper;
};

export const renderElectionsWidget = () => {
  render(<div id="dc_wdiv" data-elections="true" aria-live="polite" role="region" />);
  const wrapper = render(<ElectionInformationWidget />);
  return wrapper;
};

export const renderLegacyWidget = () => {
  render(<div id="dc_wdiv" data-candidates="true" aria-live="polite" role="region" />);
  const wrapper = render(<ElectionInformationWidget />);
  return wrapper;
};
