import React from 'react';
import { mount } from 'enzyme';
import Widget from './Widget';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter;

describe('WhereDoIVote Widget', () => {
    let screen;

    beforeEach(async () => {
        screen = mount(<Widget/>);
    });

    describe('errors', () => {
        it('should give error message when no postcode is entered', async () => {
            submitPostcode();

            await sleep(500);

            expect(errorMessage()).toEqual("Postcode is empty, please enter a non-empty postcode.");
        });

        it('should give error message malformed postcode is entered', async () => {
            submitPostcode('aaaaa');

            await sleep(500);

            expect(errorMessage()).toEqual("We don't know where you should vote");
        });
    });

    describe('successes', () => {

        it('should declare that it cannot find the station if so ', async () => {
            submitPostcode('GL1 2EQ');

            await sleep(500);

            expect(cardHeader()).toEqual("We couldn't find your station");
            expect(cardBody()).toEqual("Get in touch with Gloucester City Council:");
        });
    });

    function cardHeader() {
        return screen.find("#dc_header").map(node => node.text())[0];
    }

    function cardBody() {
        return screen.find("#dc_get_in_touch").map(node => node.text())[0];
    }

    function submitPostcode(postcode) {
        if (postcode !== undefined) {
            screen.find("#postcode").simulate('change', { 'target': { 'value': postcode}});
        }
        screen.find("button[type='submit']").simulate('click');
    }

    function errorMessage() {
      return screen.find("#dc_error").map(node => node.text())[0];
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
});
