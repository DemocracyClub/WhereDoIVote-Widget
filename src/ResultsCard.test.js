import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import ResultsCard from './ResultsCard';
import { Directions } from './Directions';
import { Notification } from './Notification';

const council = { council_id: 'test', name: 'Example Council' };

describe('ResultsCard', () => {

    const pollingStation = {
        address: "123 Test Street,T3 5TS",
        coordinates: {
            origin: "foo",
            destination: "bar"
        }
    }

    const idPilot = {
      '2018-05-03-id-pilot': {
        title: 'foo',
        url: 'bar'
      }
    };

    it('always renders header', () => {
        const wrapper = shallow(<ResultsCard pollingStation={pollingStation}/>);

        expect(wrapper).toContainReact(<h2>Your polling station</h2>);
    });

    it('renders address', () => {
        const wrapper = shallow(<ResultsCard pollingStation={pollingStation}/>);

        expect(wrapper).toContainReact(<div>123 Test Street<br />T3 5TS</div>);
    });

    it('renders out directions when coordinates are present', () => {
        const wrapper = shallow(<ResultsCard pollingStation={pollingStation}/>);

        expect(wrapper).toContainReact(<Directions origin="foo" destination="bar" />);
    });

    it('does not render out directions when coordinates are not present', () => {
        var pollingStationWithoutCoordinates = { address: "123 Test Street,T3 5TS" }

        const wrapper = shallow(<ResultsCard pollingStation={pollingStationWithoutCoordinates}/>);

        expect(wrapper).not.toContainReact(<Directions />);
    });

    it('does not show notification when there is no voter id pilot', () => {
      const wrapper = shallow(<ResultsCard pollingStation={pollingStation} metadata={{}}/>);
      expect(wrapper).not.toContainReact(<Notification />);
    });

    it('shows notification when there is a voter id pilot', () => {
      const wrapper = shallow(<ResultsCard pollingStation={pollingStation} metadata={idPilot}/>);
      expect(wrapper).toContainReact(<Notification title='foo' url='bar' />);
    });
});