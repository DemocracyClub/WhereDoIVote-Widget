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
        expect(requestUrl).toMatch("https://wheredoivote.co.uk/api/beta/postcode/T3 5TS");
    });

    it('adds metadata to show where it has been embedded', () => {
        var api = new API(axios);

        api.getPollingStation("T3 5TS").catch((err) => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toMatch("T3 5TS?utm_source=localhost&utm_medium=widget");
    });

    it('requests from selector', () => {
        var api = new API(axios);

        api.getFromSelector("https://wheredoivote.co.uk/some_path/").catch((err) => {});

        var requestUrl = axios.get.getCall(0).args[0];
        expect(requestUrl).toEqual("https://wheredoivote.co.uk/some_path/");
    });

    describe('address transformation', () => {
        let api = new API(axios);

        it('returns address if only address is present', () => {
            let input = {
                data: {
                    polling_station: {
                        properties: {
                            address: 'Some Address'
                        }
                    }
                }
            };

            expect(api.toAddress(input)).toEqual({ address: 'Some Address'});

        });

        it('substitutes newlines for commas', () => {
            let input = {
                data: {
                    polling_station: {
                        properties: {
                            address: 'Some Address\nSome Place\nSome Country'
                        }
                    }
                }
            };

            expect(api.toAddress(input)).toEqual({ address: 'Some Address,Some Place,Some Country'});
        });

        it('adds postcode if present', () => {
            let input = {
                data: {
                    polling_station: {
                        properties: {
                            address: 'Some Address',
                            postcode: 'T3 5TS'
                        }
                    }
                }
            };

            expect(api.toAddress(input)).toEqual({ address: 'Some Address,T3 5TS'});
        });

        it('adds destination postcode if present', () => {
            let input = {
                data: {
                    polling_station: {
                        properties: {
                            address: 'Some Address',
                            postcode: 'T3 5TS'
                        },
                        geometry: {
                            coordinates: [20, 10]
                        }
                    }
                }
            };

            expect(api.toAddress(input)).toEqual({
                address: 'Some Address,T3 5TS',
                coordinates: {
                    destination: "10,20"
                }
            });
        });

        it('adds origin postcode if present', () => {
            let input = {
                data: {
                    polling_station: {
                        properties: {
                            address: 'Some Address',
                            postcode: 'T3 5TS'
                        },
                        geometry: {
                            coordinates: [20, 10]
                        }
                    },
                    postcode_location: {
                        geometry: {
                            coordinates: [40, 30]
                        }
                    }
                }
            };

            expect(api.toAddress(input)).toEqual({
                address: 'Some Address,T3 5TS',
                coordinates: {
                    destination: "10,20",
                    origin: "30,40"
                }
            });
        });

    });
});