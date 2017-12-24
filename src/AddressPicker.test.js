import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import AddressPicker from './AddressPicker';

describe('AddressPicker', () => {

    it('renders addresses from list', () => {
        let addresses = [{
            address: 'foo',
            url: 'foo.com'
        },{
            address: 'bar',
            url: 'bar.com'
        }];

        const wrapper = shallow(<AddressPicker addressList={addresses}/>);

        expect(wrapper).toContainReact(<option value="foo.com">foo</option>);
        expect(wrapper).toContainReact(<option value="bar.com">bar</option>);
    });

    it('renders option for correct address not being present in list', () => {
        let addresses = [{ address: 'foo', url: 'foo.com'}];

        const wrapper = shallow(<AddressPicker addressList={addresses}/>);

        expect(wrapper).toContainReact(<option value="">My address is not in the list</option>);
    });

});