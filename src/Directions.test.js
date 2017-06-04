import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import Directions from './Directions';

describe('Directions', () => {

    const params = {
        destination: 456,
        origin: 123
    }

    it('renders only Google Maps when no origin present', () => {
        const wrapper = shallow(<Directions destination={params.destination}/>);

        expect(wrapper).toContainReact(<a href="https://maps.google.com/maps?q=456" target="_top">Show me on Google Maps</a>);
        expect(wrapper).not.toHaveHTML("https://www.openstreetmap.org");
    });

    it('renders OpenStreetMap directions when destination and origin present', () => {
        const wrapper = shallow(<Directions destination={params.destination} origin={params.origin}/>);

        expect(wrapper).toContainReact(<a href="https://maps.google.com/maps?q=456" target="_top">Show me on Google Maps</a>);
        expect(wrapper).toContainReact(<a href="https://www.openstreetmap.org/directions?engine=mapzen_foot&route=123;456" target="_top">show me directions</a>);

    });

});