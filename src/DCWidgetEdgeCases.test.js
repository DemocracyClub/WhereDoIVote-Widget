import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import DemocracyClubWidget from './DemocracyClubWidget';
import fs from 'fs';

afterEach(cleanup);

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

  function typePostcode(postcode) {
    fireEvent.change(container.querySelector('#postcode'), {
      target: { value: postcode },
    });
  }

  function submitPostcode() {
    fireEvent.submit(getByTestId('postcode-selector'));
  }

  function mockResponse(endpoint, param) {
    const content = fs.readFileSync(`./public/example-responses/${endpoint}-${param}.json`);
    axiosMock.get.mockResolvedValueOnce({
      data: JSON.parse(content),
    });
  }

  it("should display 'No upcoming election' message if there isn't an upcoming date", async () => {
    let enteredPostcode = 'AA11AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const NoUpcomingElection = await waitForElement(() =>
      container.querySelector('.NoUpcomingElection')
    );
    expect(NoUpcomingElection).toHaveTextContent(
      "We don't know of any upcoming elections in your area"
    );
  });

  describe('Address picker', () => {
    it('should load address picker if multiple addresses returned', async () => {
      let enteredPostcode = 'TN48XA';

      mockResponse('postcode', enteredPostcode);
      typePostcode(enteredPostcode);
      submitPostcode();

      const firstDatePickerOption = await waitForElement(() =>
        container.querySelector('#id_address option:first-child')
      );
      expect(firstDatePickerOption).toHaveTextContent('1 LANGTON ROAD, TUNBRIDGE WELLS');
    });

    it('should show polling station for address chosen from picker', async () => {
      let enteredPostcode = 'TN48XA';
      mockResponse('postcode', enteredPostcode);
      typePostcode(enteredPostcode);
      submitPostcode();
      const rusthall = await waitForElement(() =>
        container.querySelector('#id_address option:nth-child(27)')
      );
      fireEvent.change(getByTestId('address-select'), {
        target: { value: rusthall.innerHTML },
      });
      const button = await waitForElement(() => getByTestId('address-button'));
      let addressId = '10000066465';
      mockResponse('address', addressId);
      fireEvent.click(button);
      const pollingStation = await waitForElement(() => container.querySelector('.PollingStation'));
      expect(pollingStation).toHaveTextContent('Your polling station');
    });
  });

  describe('Notifications', () => {
    it('should show voter ID requirement for DE13GB', async () => {
      let enteredPostcode = 'DE13GB';

      mockResponse('postcode', enteredPostcode);
      typePostcode(enteredPostcode);
      submitPostcode();
      const notificationContainer = await waitForElement(() =>
        container.querySelector('.PollingStation article[role=alert]')
      );
      expect(notificationContainer).toHaveTextContent(
        'You need to show ID to vote at this election'
      );
    });

    it('should show an uncontested election for SS30AA', async () => {
      let enteredPostcode = 'SS30AA';
      mockResponse('postcode', enteredPostcode);
      typePostcode(enteredPostcode);
      submitPostcode();
      const notification = await waitForElement(() => getByTestId('notification'));
      expect(notification).toHaveTextContent('Uncontested Election');
    });
  });
});
