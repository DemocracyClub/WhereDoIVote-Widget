import * as axios from 'axios';

export function getPollingStation(postcode) {
    return axios.get('https://wheredoivote.co.uk/api/beta/postcode/' + postcode + '.json')
}

export function getFromSelector(url) {
    return axios.get(url.substring(0, url.length - 1) + '.json')
}

export function toAddress(output) {
    const address = output.data.polling_station.properties.address.replace('\n',', ');
    const coordinates = output.data.polling_station.geometry.coordinates

    return {
       address: address,
       coordinates: coordinates[1] + "," + coordinates[0]
    }
}