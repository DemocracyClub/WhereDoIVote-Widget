import * as axios from 'axios';

export function getPollingStation(postcode) {
    return axios.get('https://wheredoivote.co.uk/api/beta/postcode/' + postcode + '.json')
}

export function getFromSelector(url) {
    return axios.get(url.substring(0, url.length - 1) + '.json')
}

export function toAddress(output) {
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

       if (output.data.postcode_location.geometry) {
          const originCoordinates = output.data.postcode_location.geometry.coordinates;
          coordinates.origin = originCoordinates[1] + "," + originCoordinates[0];
       }

       addressData.coordinates = coordinates;
    }

    return addressData;
}