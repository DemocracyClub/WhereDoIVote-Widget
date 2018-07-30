function API(client) {

    client.defaults.headers.get['Content-Type'] = 'application/json';

    function toUrl(postcode) {
        return 'https://wheredoivote.co.uk/api/beta/postcode/' + postcode;
    }

    function addAnalytics() {
        if (window && window.location && window.location.hostname && window.location.hostname !== "") {
            return "utm_source="+window.location.hostname+"&utm_medium=widget";
        } else {
            return "utm_source=unknown&utm_medium=widget";
        }
    }

    return {
        getPollingStation: function(postcode) {
            return client.get(toUrl(postcode) + "?" + addAnalytics());
        },

        getFromSelector: function(url) {
            return client.get(url);
        },

        toAddress: function(output) {
            let address = output.data.polling_station.properties.address.replace(/\n/g,',');

            if (output.data.polling_station.properties.postcode) {
                address += ',' + output.data.polling_station.properties.postcode;
            }

            const addressData = { address: address }

            if (output.data.polling_station.geometry) {
               const destinationCoordinates = output.data.polling_station.geometry.coordinates

               let coordinates = {
                 destination: destinationCoordinates[1] + "," + destinationCoordinates[0]
               }

               if (output.data.postcode_location) {
                 if (output.data.postcode_location.geometry) {
                   const originCoordinates = output.data.postcode_location.geometry.coordinates;
                   coordinates.origin = originCoordinates[1] + "," + originCoordinates[0];
                 }
               }

               addressData.coordinates = coordinates;
            }

            return addressData;
        }
    };
}

export default API;