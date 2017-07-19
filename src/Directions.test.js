import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { Directions, GoogleMaps, GoogleDirections } from './Directions';

describe('Directions', () => {

    const params = {
        destination: 456,
        origin: 123
    }

    it('renders only Google Maps when no origin present', () => {
        const wrapper = shallow(<Directions destination={params.destination}/>);

        expect(wrapper).toContainReact(<GoogleMaps destination={456}/>);
        expect(wrapper).not.toContainReact(<GoogleDirections/>);
    });

    it('renders only Google Directions when destination and origin present', () => {
        const wrapper = shallow(<Directions destination={params.destination} origin={params.origin}/>);

        expect(wrapper).not.toContainReact(<GoogleMaps/>);
        expect(wrapper).toContainReact(<GoogleDirections destination={456} origin={123}/>);
    });

});