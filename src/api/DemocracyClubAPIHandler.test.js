import * as sinon from 'sinon';
import axios from 'axios';

import API from './DemocracyClubAPIHandler';

function getDCAPIPollingStationResponseFormat(election) {
    return { data: { dates: [election] } };
}

describe('Democracy Club API client', () => {
    beforeEach(() => {
        sinon.spy(axios, 'get');
    });

    afterEach(() => {
        axios.get.restore();
    });

    it('makes request for postcode', () => {
        var api = new API(axios);

        api.getPollingStation('T3 5TS').catch(err => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toMatch(
            'https://developers.democracyclub.org.uk/api/v1/sandbox/postcode/T3 5TS'
        );
    });

    describe('appends tracking information', () => {
        function setLocation(location) {
            Object.defineProperty(window, 'location', { value: location, writable: true });
        }

        it('and escapes when url is present on window', () => {
            setLocation({ href: 'https://example.com/foo' });

            var api = new API(axios);

            api.getPollingStation('T3 5TS').catch(err => {});

            var requestUrl = axios.get.getCall(0).args[0];
            expect(requestUrl).toMatch(
                'utm_source=https%3A%2F%2Fexample.com%2Ffoo&utm_medium=widget'
            );
        });

        it('when location is not present on window', () => {
            setLocation(undefined);

            var api = new API(axios);

            api.getPollingStation('T3 5TS').catch(err => {});

            var requestUrl = axios.get.getCall(0).args[0];
            expect(requestUrl).toMatch('utm_source=unknown&utm_medium=widget');
        });
    });

    it('requests from selector', () => {
        var api = new API(axios);

        api.getFromSelector(
            'https://developers.democracyclub.org.uk/api/v1/sandbox/some_path/'
        ).catch(err => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toEqual(
            'https://developers.democracyclub.org.uk/api/v1/sandbox/some_path/'
        );
    });

    describe('address transformation', () => {
        let api = new API(axios);

        it('returns address if only address is present', () => {
            let input = getDCAPIPollingStationResponseFormat({
                polling_station: {
                    station: {
                        properties: {
                            address: 'Some Address',
                        },
                    },
                },
            });

            expect(api.toAddress(input)).toEqual({ address: 'Some Address' });
        });

        it('substitutes newlines for commas', () => {
            let input = getDCAPIPollingStationResponseFormat({
                polling_station: {
                    station: {
                        properties: {
                            address: 'Some Address\nSome Place\nSome Country',
                        },
                    },
                },
            });

            expect(api.toAddress(input)).toEqual({
                address: 'Some Address,Some Place,Some Country',
            });
        });

        it('adds postcode if present', () => {
            let input = getDCAPIPollingStationResponseFormat({
                polling_station: {
                    station: {
                        properties: {
                            address: 'Some Address',
                            postcode: 'T3 5TS',
                        },
                    },
                },
            });

            expect(api.toAddress(input)).toEqual({ address: 'Some Address,T3 5TS' });
        });

        it('adds destination postcode if present', () => {
            let input = getDCAPIPollingStationResponseFormat({
                polling_station: {
                    station: {
                        properties: {
                            address: 'Some Address',
                            postcode: 'T3 5TS',
                        },
                        geometry: {
                            coordinates: [20, 10],
                        },
                    },
                },
            });

            expect(api.toAddress(input)).toEqual({
                address: 'Some Address,T3 5TS',
                coordinates: {
                    destination: '10,20',
                },
            });
        });

        it('adds origin postcode if present', () => {
            let input = {
                data: {
                    dates: [
                        {
                            polling_station: {
                                station: {
                                    properties: {
                                        address: 'Some Address',
                                        postcode: 'T3 5TS',
                                    },
                                    geometry: {
                                        coordinates: [20, 10],
                                    },
                                },
                            },
                        },
                    ],
                    postcode_location: {
                        geometry: {
                            coordinates: [40, 30],
                        },
                    },
                },
            };

            expect(api.toAddress(input)).toEqual({
                address: 'Some Address,T3 5TS',
                coordinates: {
                    destination: '10,20',
                    origin: '30,40',
                },
            });
        });
    });
});
