class MockDCAPI {
  constructor() {
    this.defaults = {
      headers: {
        get: {
          'Content-Type': 'application/json',
        },
      },
    };
  }

  async get(url) {
    const { pathname } = new URL(url);
    const path_parts = pathname.split('/').filter(Boolean);
    const len = path_parts.length;
    const exampleResponsePath = `/example-responses/${path_parts[len - 2]}-${
      path_parts[len - 1]
    }.json`;

    try {
      const response = await fetch(exampleResponsePath);
      const text = await response.text(); // Parse it as text
      const myJson = { data: JSON.parse(text) }; // Try to parse it as json
      return myJson;
    } catch (error) {
      return error;
    }
  }
}

export default MockDCAPI;
