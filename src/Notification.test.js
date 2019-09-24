import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { Notification } from './Notification';

configure({ adapter: new Adapter() });

describe('Notification', () => {
    let notification;

    beforeEach(() => {
        notification = shallow(<Notification title="123" url="123" />);
    });

    it('Has an accessible alert role attribute', () => {
        const innerDiv = notification.find('div');
        expect(innerDiv.find('div').length).toEqual(1);
        let alertRoleIndex = innerDiv
            .find('div')
            .first()
            .html()
            .indexOf('alert');
        let gotAlertRole = alertRoleIndex > 0 ? true : false;
        expect(gotAlertRole).toEqual(true);
    });
});
