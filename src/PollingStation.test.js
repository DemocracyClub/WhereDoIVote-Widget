import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import PollingStation from './PollingStation';
import { Directions } from './Directions';
import { Notifications } from './Notifications';

configure({ adapter: new Adapter() });

describe('PollingStation', () => {
  const pollingStation = {
    address: '123 Test Street, T3 5TS',
    coordinates: {
      origin: 'foo',
      destination: 'bar',
    },
  };

  const notifications = [
    {
      type: 'voter_id',
      url: 'https://www.example.com',
      title: 'You need ID',
      detail: 'you really will need ID',
    },
  ];

  it('always renders header', () => {
    const wrapper = shallow(<PollingStation station={pollingStation} notifications={[]} />);

    expect(wrapper).toContainReact(<h2 className="dc-header">Your polling station</h2>);
  });

  it('renders address', () => {
    const wrapper = shallow(<PollingStation station={pollingStation} notifications={[]} />);

    expect(wrapper).toContainReact(
      <div className="address">
        123 Test Street
        <br />
        T3 5TS
      </div>
    );
  });

  it('renders out directions when coordinates are present', () => {
    const wrapper = shallow(<PollingStation station={pollingStation} notifications={[]} />);

    expect(wrapper).toContainReact(<Directions origin="foo" destination="bar" />);
  });

  it('does not render out directions when coordinates are not present', () => {
    var pollingStationWithoutCoordinates = { address: '123 Test Street, T3 5TS' };

    const wrapper = shallow(
      <PollingStation station={pollingStationWithoutCoordinates} notifications={[]} />
    );

    expect(wrapper).not.toContainReact(<Directions />);
  });

  it('does not show notification when there is no voter id pilot', () => {
    const wrapper = shallow(
      <PollingStation station={pollingStation} notifications={notifications} />
    );
    expect(wrapper).not.toContainReact(<Notifications />);
  });

  it('shows notification when there is a voter id pilot', () => {
    const wrapper = shallow(
      <PollingStation station={pollingStation} notifications={notifications} />
    );
    expect(wrapper).toContainReact(<Notifications list={notifications} />);
  });
});
