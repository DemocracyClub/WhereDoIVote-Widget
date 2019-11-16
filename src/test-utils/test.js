import React from 'react';
import DemocracyClubWidget from '../DemocracyClubWidget';
import { fireEvent, render } from '@testing-library/react';
import axiosMock from 'axios';
import fs from 'fs';

export const childAttributeChecker = shallowComponent => (selector, attribute) => {
  return shallowComponent
    .find(selector)
    .first()
    .html()
    .indexOf(attribute)
    ? true
    : false;
};

export const typePostcode = postcode => {
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
  const wrapper = render(<DemocracyClubWidget />);
  return wrapper;
};

export const renderWelshWidget = () => {
  render(<div id="dc_wdiv" data-language="cy" aria-live="polite" role="region" />);
  const wrapper = render(<DemocracyClubWidget />);
  return wrapper;
};

export const renderEnglishWidget = () => {
  render(<div id="dc_wdiv" data-language="en" aria-live="polite" role="region" />);
  const wrapper = render(<DemocracyClubWidget />);
  return wrapper;
};
