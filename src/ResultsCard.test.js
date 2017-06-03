import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import ResultsCard from './ResultsCard';

const council = { council_id: 'test', name: 'Example Council' };

describe('ResultsCard', () => {

    const pollingStation = {
        address: "123 Test Street,T3 5TS"
    }

    it('always renders header', () => {
        const wrapper = shallow(<ResultsCard pollingStation={pollingStation}/>);

        expect(wrapper).toContainReact(<h2>Your polling station</h2>);
    });

    it('renders address correctly', () => {
        const wrapper = shallow(<ResultsCard pollingStation={pollingStation}/>);

        expect(wrapper).toContainReact(<div>123 Test Street<br />T3 5TS</div>);
    });

});