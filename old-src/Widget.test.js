import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DemocracyClubWidget from './DemocracyClubWidget';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import translations from './translations/en'

axios.defaults.adapter = httpAdapter;
configure({ adapter: new Adapter() });

describe('WhereDoIVote Widget', () => {
    let screen;

    beforeEach(async () => {
        screen = mount(<DemocracyClubWidget />);
    });

    describe('errors', () => {
        it('should give error message when no postcode is entered', async () => {
            submitPostcode();

            await sleep(2000);

            expect(errorMessage()).toEqual(translations["postcode.errors.invalid-postcode"]);
        });

        it('should give error message malformed postcode is entered', async () => {
            submitPostcode('aaaaa');

            await sleep(2000);

            expect(errorMessage()).toEqual(translations["api.errors.voting-location-unknown"]);
        });
    });

    describe('successes', () => {
        it('should declare that it cannot find the station if so ', async () => {
            submitPostcode('GL1 2EQ');

            await sleep(2000);

            expect(cardHeader()).toEqual("We couldn't find your station");
            expect(cardBody()).toEqual('Get in touch with Gloucester City Council:');
        });

        it('should accept Enter instead of clicking the button', async () => {
            submitPostcodeWithEnter('GL1 2EQ');

            await sleep(2000);

            expect(cardHeader()).toEqual("We couldn't find your station");
            expect(cardBody()).toEqual('Get in touch with Gloucester City Council:');
        });
    });

    function cardHeader() {
        screen.update();
        return screen.find('#dc_header').map(node => node.text())[0];
    }

    function cardBody() {
        screen.update();
        return screen.find('#dc_get_in_touch').map(node => node.text())[0];
    }

    function submitPostcodeWithEnter(postcode) {
        screen.find('#postcode').simulate('change', { target: { value: postcode } });
        screen.find('#postcode').simulate('keyPress', { key: 'Enter', keyCode: 13 });
    }

    function submitPostcode(postcode) {
        console.log(screen.find('#postcode'))
        if (postcode !== undefined) {
            screen.find('#postcode').simulate('change', { target: { value: postcode } });
        }
        screen.find("button[type='submit']").simulate('click');
    }

    function errorMessage() {
        screen.update();
        return screen.find('#dc_error').map(node => node.text())[0];
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
