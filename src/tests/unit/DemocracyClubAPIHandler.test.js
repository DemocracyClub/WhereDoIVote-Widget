import * as sinon from 'sinon';
import axios from 'axios';

import { APIClient, APIClientFactory } from '../../api/DemocracyClubAPIHandler';

function getDCAPIPollingStationResponseFormat(election) {
  return { data: { dates: [election] } };
}

let api = new APIClient(axios, 'https://developers.democracyclub.org.uk/api/v1', null);

describe('Democracy Club API client', () => {
  beforeEach(() => {
    sinon.spy(axios, 'get');
  });

  afterEach(() => {
    axios.get.restore();
  });

  it('makes request for postcode', () => {
    api.fetchByPostcode('T3 5TS').catch(err => {});
    var requestUrl = axios.get.getCall(0).args[0];
    expect(requestUrl).toMatch('https://developers.democracyclub.org.uk/api/v1/postcode/T3 5TS');
  });

  describe('appends tracking information', () => {
    function setLocation(location) {
      Object.defineProperty(window, 'location', { value: location, writable: true });
    }

    it('when location is present on window', () => {
      setLocation({ href: 'https://example.com/foo' });
      api.fetchByPostcode('T3 5TS').catch(err => {});
      var requestParams = axios.get.getCall(0).args[1].params;
      expect(requestParams.utm_source).toMatch('https://example.com/foo');
      expect(requestParams.utm_medium).toMatch('widget');
    });

    it('when location is not present on window', () => {
      setLocation(undefined);
      api.fetchByPostcode('T3 5TS').catch(err => {});
      var requestParams = axios.get.getCall(0).args[1].params;
      expect(requestParams.utm_source).toMatch('unknown');
      expect(requestParams.utm_medium).toMatch('widget');
    });
  });

  describe('uses API key', () => {
    function setLocation(location) {
      Object.defineProperty(window, 'location', { value: location, writable: true });
    }

    it('when key is present', () => {
      api = new APIClient(axios, 'https://developers.democracyclub.org.uk/api/v1', 'f00b42');
      setLocation({ href: 'https://example.com/foo' });
      api.fetchByPostcode('T3 5TS').catch(err => {});
      var requestParams = axios.get.getCall(0).args[1].params;
      expect(requestParams.auth_token).toMatch('f00b42');
    });

    it('when key is not present', () => {
      api = new APIClient(axios, 'https://developers.democracyclub.org.uk/api/v1', null);
      setLocation(undefined);
      api.fetchByPostcode('T3 5TS').catch(err => {});
      var requestParams = axios.get.getCall(0).args[1].params;
      expect(requestParams.auth_token).toBe(undefined);
    });
  });

  it('requests from selector', () => {
    api.fetch('https://developers.democracyclub.org.uk/api/v1/some_path/').catch(err => {});

    var requestUrl = axios.get.getCall(0).args[0];
    expect(requestUrl).toEqual('https://developers.democracyclub.org.uk/api/v1/some_path/');
  });

  describe('address transformation', () => {
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
        address: 'Some Address, Some Place, Some Country',
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

      expect(api.toAddress(input)).toEqual({ address: 'Some Address, T3 5TS' });
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
        address: 'Some Address, T3 5TS',
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
        address: 'Some Address, T3 5TS',
        coordinates: {
          destination: '10,20',
          origin: '30,40',
        },
      });
    });
  });
});

describe('API Client Factory', () => {
  it('Constructs APIClient with valid inputs', () => {
    expect(APIClientFactory({ REACT_APP_API: 'prod', REACT_APP_API_KEY: 'f00ba2' })).toBeInstanceOf(
      Object
    );
    expect(APIClientFactory({ REACT_APP_API: 'mock' })).toBeInstanceOf(Object);
    expect(APIClientFactory({ REACT_APP_API: 'sandbox' })).toBeInstanceOf(Object);
  });

  it('Throws with valid inputs', () => {
    expect(() => APIClientFactory({ REACT_APP_API: 'prod' })).toThrow(Error);
    expect(() => APIClientFactory({ REACT_APP_API: 'cheese' })).toThrow(Error);
  });
});
