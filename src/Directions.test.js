import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { Directions, GoogleMaps, GoogleDirections } from './Directions';

configure({ adapter: new Adapter() });

describe('Directions', () => {
    const params = {
        destination: 456,
        origin: 123,
    };

    it('renders Google Maps only when no origin present', () => {
        const wrapper = shallow(<Directions destination={params.destination} />);

        expect(wrapper).toContainReact(<GoogleMaps destination={456} />);
        expect(wrapper).not.toContainReact(<GoogleDirections />);
    });

    it('renders Google Directions only when destination and origin present', () => {
        const wrapper = shallow(
            <Directions destination={params.destination} origin={params.origin} />
        );

        expect(wrapper).not.toContainReact(<GoogleMaps />);
        expect(wrapper).toContainReact(<GoogleDirections destination={456} origin={123} />);
    });
});
