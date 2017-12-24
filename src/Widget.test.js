import React from 'react';
import { mount } from 'enzyme';
import Widget from './Widget';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter;

describe('WhereDoIVote API client', () => {
    let screen;

    beforeEach(async () => {
        screen = mount(<Widget/>);
    });

    it('should give error message when no postcode is entered', async () => {
        submitPostcode();

        await sleep(500);

        expect(getErrorMessage()).toEqual("Postcode is empty, please enter a non-empty postcode.");
    });

    it('should give error message malformed postcode is entered', async () => {
        submitPostcode('aaaaa');

        await sleep(500);

        expect(getErrorMessage()).toEqual("We don't know where you should vote");
    });

    function submitPostcode(postcode) {
        if (postcode !== undefined) {
            screen.find("#postcode").simulate('change', { 'target': { 'value': postcode}});
        }
        screen.find("button[type='submit']").simulate('click');
    }

    function getErrorMessage() {
      return screen.find("#dc_error").map(node => node.text())[0];
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
});
