import * as sinon from 'sinon';
import * as axios from 'axios';

import API from './WdivAPI';

describe('WhereDoIVote API client', () => {

    beforeEach(() => {
        sinon.spy(axios, "get");
    });

    afterEach(() => {
        axios.get.restore();
    });

    it('makes request for postcode', () => {
        var api = new API(axios);

        api.getPollingStation("T3 5TS").catch((err) => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toMatch("https://wheredoivote.co.uk/api/beta/postcode/T3 5TS.json");
    });

    it('adds metadata to show where it has been embedded', () => {
        var api = new API(axios);

        api.getPollingStation("T3 5TS").catch((err) => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toMatch("T3 5TS.json?utm_source=localhost&utm_medium=widget");
    });
});