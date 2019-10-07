import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import AddressPicker from './AddressPicker';

configure({ adapter: new Adapter() });

describe('AddressPicker', () => {
    it('renders addresses from list', () => {
        let addresses = [
            {
                address: 'foo',
                url: 'foo.com',
            },
            {
                address: 'bar',
                url: 'bar.com',
            },
        ];

        const wrapper = shallow(<AddressPicker addressList={addresses} />);

        expect(wrapper).toContainReact(<option value="foo.com">foo</option>);
        expect(wrapper).toContainReact(<option value="bar.com">bar</option>);
    });

    it('renders option for correct address not being present in list', () => {
        let addresses = [{ address: 'foo', url: 'foo.com' }];

        const wrapper = shallow(<AddressPicker addressList={addresses} />);

        expect(wrapper).toContainReact(<option value="not-in-list">My address is not in the list</option>);
    });
});
