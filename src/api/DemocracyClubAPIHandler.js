import axios from 'axios';
import MockDCAPI from '../tests/utils/MockDCAPI';

export function APIClientFactory(env = process.env) {
  const API_BASE = 'https://developers.democracyclub.org.uk/api/v1';

  // https://create-react-app.dev/docs/adding-custom-environment-variables

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

  const fetch = function (url) {
    let utm_source;
    try {
      utm_source = window.location.href;
    } catch (e) {
      utm_source = 'unknown';
    }
    const params = { utm_source, utm_medium: 'widget' };
    if (api_key) {
      params.auth_token = api_key;
    }
    params.include_accessibility = true;
    params.include_2026_pilots = true;
    return client.get(url, { params });
  };

  return {
    fetchByPostcode: function (postcode) {
      return fetch(`${base_url}/postcode/${postcode}`);
    },

    fetch: function (url) {
      return fetch(url);
    },
  };
}
