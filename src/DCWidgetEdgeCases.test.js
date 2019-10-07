import React from 'react';
import {
    render,
    cleanup,
    fireEvent,
    waitForElement,
    waitForDomChange,
    wait,
    act,
    getByTestId,
    getByLabelText,
    getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import translations from './translations/en';
import DemocracyClubWidget from './DemocracyClubWidget';

import fs from 'fs';

afterEach(cleanup);

describe('WhereDoIVote Widget', () => {
    let container, getByTestId, debug;

    beforeEach(async () => {
        const wrapper = render(<DemocracyClubWidget />);
        container = wrapper.container;
        getByTestId = wrapper.getByTestId;
        debug = wrapper.debug;
    });

    function typePostcode(postcode) {
        fireEvent.change(container.querySelector('#postcode'), {
            target: { value: postcode },
        });
    }

    function submitPostcode() {
        fireEvent.submit(getByTestId('postcode-selector'));
    }

    function submitAddress() {
        fireEvent.submit(getByTestId('address-selector'));
    }

    function mockResponseForPostcode(pc) {
        const content = fs.readFileSync(`./public/example-responses/postcode-${pc}.json`);
        axiosMock.get.mockResolvedValueOnce({
            data: JSON.parse(content),
        });
    }

    it("should display 'No upcoming election' if there isn't an upcoming date", async () => {
        let enteredPostcode = 'AA11AA';
        mockResponseForPostcode(enteredPostcode);
        typePostcode(enteredPostcode);
        submitPostcode();
        const NoUpcomingElection = await waitForElement(() =>
            container.querySelector('.NoUpcomingElection')
        );
        expect(NoUpcomingElection).toHaveTextContent('No upcoming election');
    });

    describe('Address picker', () => {
        it('should load address picker for Tunbridge Wells postcode', async () => {
            let enteredPostcode = 'TN48XA';

            const content = fs.readFileSync(
                `./public/example-responses/postcode-${enteredPostcode}.json`
            );
            axiosMock.get.mockResolvedValueOnce({
                data: JSON.parse(content),
            });
            typePostcode(enteredPostcode);
            submitPostcode();

            const firstDatePickerOption = await waitForElement(() =>
                container.querySelector('#id_address option:first-child')
            );
            expect(firstDatePickerOption).toHaveTextContent('1 LANGTON ROAD, TUNBRIDGE WELLS');
        });

        it('should show polling station for address chosen from picker', async () => {
            let enteredPostcode = 'TN48XA';
            const content = fs.readFileSync(
                `./public/example-responses/postcode-${enteredPostcode}.json`
            );
            axiosMock.get.mockResolvedValueOnce({
                data: JSON.parse(content),
            });
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
            const addressJSON = fs.readFileSync(
                `./public/example-responses/address-${addressId}.json`
            );
            axiosMock.get.mockResolvedValueOnce({
                data: JSON.parse(addressJSON),
            });
            fireEvent.click(button);
            const pollingStation = await waitForElement(() =>
                container.querySelector('.PollingStation')
            );
            expect(pollingStation).toHaveTextContent('Your polling station');
        });
    });

    describe('Exceptional circumstances', () => {
        it('should show voter ID requirement for DE13GB', async () => {
            let enteredPostcode = 'DE13GB';

            const content = fs.readFileSync(
                `./public/example-responses/postcode-${enteredPostcode}.json`
            );
            axiosMock.get.mockResolvedValueOnce({
                data: JSON.parse(content),
            });
            typePostcode(enteredPostcode);
            submitPostcode();
            const notificationContainer = await waitForElement(() =>
                container.querySelector('.PollingStation div[role=alert]')
            );
            expect(notificationContainer).toHaveTextContent(
                'You need to show ID to vote at this election'
            );
        });

        it('should show an uncontested election for SS30AA', async () => {
            let enteredPostcode = 'SS30AA';
            mockResponseForPostcode(enteredPostcode);
            typePostcode(enteredPostcode);
            submitPostcode();
            const notification = await waitForElement(() => getByTestId('notification'));
            expect(notification).toHaveTextContent('Uncontested Election');
        });
    });
});
