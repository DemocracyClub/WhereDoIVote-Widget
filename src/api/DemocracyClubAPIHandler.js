

function API(client) {
    client.defaults.headers.get['Content-Type'] = 'application/json';

    function whereDoIVoteApiEndpoint() {
        return process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_WDIV_API_URL
            : 'https://developers.democracyclub.org.uk/api/v1/sandbox';
    }

    function toUrl(postcode) {
        return whereDoIVoteApiEndpoint() + '/postcode/' + postcode;
    }

    function addAnalytics() {
        try {
            const encodedUrl = encodeURIComponent(window.location.href);
            return 'utm_source=' + encodedUrl + '&utm_medium=widget';
        } catch (e) {
            return 'utm_source=unknown&utm_medium=widget';
        }
    }

    return {
        getPollingStation: function(postcode) {
            return client.get(toUrl(postcode) + '?' + addAnalytics());
        },

        getFromSelector: function(url) {
            return client.get(url);
        },

        toAddress: function(response) {
            let nextBallotDate = response.data.dates[0]
            let stationProperties = nextBallotDate.polling_station.station.properties
            let address = stationProperties.address.replace(/\n/g, ',');
 
            if (stationProperties.postcode) {
                address += ',' + stationProperties.postcode;
            }

            const addressData = { address: address };

            if (nextBallotDate.polling_station.station.geometry) {
                const destinationCoordinates = nextBallotDate.polling_station.station.geometry.coordinates;

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

export default API;
