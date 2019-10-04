import React from 'react';
import { render, cleanup, fireEvent, waitForElement, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import translations from './translations/en';
import DemocracyClubWidget from './DemocracyClubWidget';

describe('WhereDoIVote Widget', () => {
    let container, getByTestId;

    beforeEach(async () => {
        const wrapper = render(<DemocracyClubWidget />);
        container = wrapper.container;
        getByTestId = wrapper.getByTestId;
    });

    function typePostcode(postcode) {
        act(() => {
            fireEvent.change(container.querySelector('#postcode'), {
                target: { value: postcode },
            });
        });
    }

    function submitPostcode() {
        act(() => {
            fireEvent.submit(getByTestId('postcode-selector'));
        });
    }

    // it('should not give error message if correct postcode is entered', async () => {
    //     let enteredPostcode = 'EH3 6AR';
    //     typePostcode(enteredPostcode);
    //     submitPostcode();
    //     const beat = waitFor('.Loader');
    //     expect(container.querySelector('#dc_error')).toBe(null);
    // });

    it('should give error message when no postcode is entered', async () => {
        submitPostcode();
        const newContent = await waitForElement(() => container.querySelector('#dc_error'));

        expect(newContent).toHaveTextContent(translations['postcode.errors.invalid-postcode']);
    });

    it('should give error message malformed postcode is entered', async () => {
        let enteredPostcode = 'aaaa';
        typePostcode(enteredPostcode);
        submitPostcode();
        const newContent = await waitForElement(() => container.querySelector('#dc_error'));
        expect(newContent).toHaveTextContent(translations['postcode.errors.invalid-postcode']);
    });
});
