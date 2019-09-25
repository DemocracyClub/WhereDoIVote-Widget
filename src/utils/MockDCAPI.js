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
        let exampleResponsePath;
        if (url.indexOf('100') > 0) {
            // it's an address ID
            let addressId = url
                .split('/address/')[1]
                .split('/')[0]
                .split(' ')
                .join('');
            exampleResponsePath = `/example-responses/address-${addressId}.json`;
        } else {
            // it's a postcode
            let postcode = url
                .split('/postcode/')[1]
                .split('?')[0]
                .split(' ')
                .join('');
            exampleResponsePath = `/example-responses/postcode-${postcode}.json`;
        }

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
