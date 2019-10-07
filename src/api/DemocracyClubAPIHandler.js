import axios from 'axios';
import MockDCAPI from '../test-utils/MockDCAPI';

export function APIClientFactory(env = process.env) {
    const API_BASE = 'https://developers.democracyclub.org.uk/api/v1';

    // https://create-react-app.dev/docs/adding-custom-environment-variables

    if (env.NODE_ENV === 'production') {
        // we're building an optimised production build
        if (!('REACT_APP_API_KEY' in env)) {
            throw new Error('REACT_APP_API_KEY must be set in order to create a production build.');
        }
        return new APIClient(axios, API_BASE, env.REACT_APP_API_KEY);
    }

    // we're running in dev or under test
    if (env.REACT_APP_API === 'mock') {
        return new APIClient(new MockDCAPI(), API_BASE, null);
    } else if (env.REACT_APP_API === 'sandbox') {
        return new APIClient(axios, `${API_BASE}/sandbox`, null);
    } else if (env.REACT_APP_API === 'prod') {
        if (!('REACT_APP_API_KEY' in env)) {
            throw new Error('REACT_APP_API_KEY must be set in order to call the production API.');
        }
        return new APIClient(axios, API_BASE, env.REACT_APP_API_KEY);
    } else {
        throw new Error("REACT_APP_API must be set and one of: ['mock', 'sandbox', 'prod']");
    }
}

export function APIClient(client, base_url, api_key) {
    client.defaults.headers.get['Content-Type'] = 'application/json';

    const get = function(url) {
        let utm_source;
        try {
            utm_source = window.location.href;
        } catch (e) {
            utm_source = 'unknown';
        }
        const headers = api_key ? { Authorization: `Token ${api_key}` } : {};
        return client.get(url, {
            params: { utm_source, utm_medium: 'widget' },
            headers,
        });
    };

    return {
        getPollingStation: function(postcode) {
            return get(`${base_url}/postcode/${postcode}`);
        },

        getFromSelector: function(url) {
            return get(url);
        },

        toAddress: function(response) {
            let nextBallotDate = response.data.dates[0];
            let stationProperties = nextBallotDate.polling_station.station.properties;
            let address = stationProperties.address.replace(/\n/g, ', ');

            if (stationProperties.postcode) {
                address += ', ' + stationProperties.postcode;
            }

            const addressData = { address: address };

            if (nextBallotDate.polling_station.station.geometry) {
                const destinationCoordinates =
                    nextBallotDate.polling_station.station.geometry.coordinates;

                let coordinates = {
                    destination: destinationCoordinates[1] + ',' + destinationCoordinates[0],
                };

                if (response.data.postcode_location) {
                    if (response.data.postcode_location.geometry) {
                        const originCoordinates =
                            response.data.postcode_location.geometry.coordinates;
                        coordinates.origin = originCoordinates[1] + ',' + originCoordinates[0];
                    }
                }

                addressData.coordinates = coordinates;
            }

            return addressData;
        },
    };
}
