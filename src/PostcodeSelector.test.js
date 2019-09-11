import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import PostcodeSelector from './PostcodeSelector';
import { childAttributeChecker } from './utils/test';

configure({ adapter: new Adapter() });

describe('PostcodeSelector', function() {
    let postcodeSelectorComponent;
    let postCodeSelectorContains;

    beforeEach(() => {
        postcodeSelectorComponent = shallow(<PostcodeSelector />);
        postCodeSelectorContains = childAttributeChecker(postcodeSelectorComponent);
    });

    it('should be selectable by class "PostcodeSelector"', function() {
        expect(postcodeSelectorComponent.is('.PostcodeSelector')).toBe(true);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<PostcodeSelector />).find('.PostcodeSelector').length).toBe(1);
    });

    it('should contain a for attribute on the form label', function() {
        expect(postCodeSelectorContains('label', 'for')).toEqual(true);
    });
});
