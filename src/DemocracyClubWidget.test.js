import React from 'react';
import DemocracyClubWidget from './DemocracyClubWidget';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

describe('DemocracyClubWidget', () => {
    let dcWidgetComponent;

    beforeEach(() => {
        dcWidgetComponent = render(<DemocracyClubWidget />);
    });

    it('should be selectable by class "DemocracyClubWidget"', function() {
        expect(dcWidgetComponent.is('.DemocracyClubWidget')).toBe(true);
    });

});
