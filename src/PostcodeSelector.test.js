import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import PostcodeSelector from './PostcodeSelector';

configure({ adapter: new Adapter() });

describe('PostcodeSelector', function() {
    let postcodeSelectorComponent;

    beforeEach(() => {
        postcodeSelectorComponent = shallow(<PostcodeSelector />);
        console.log(postcodeSelectorComponent)
    });

    it('should be selectable by class "PostcodeSelector"', function() {
        expect(postcodeSelectorComponent.is('.PostcodeSelector')).toBe(true);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<PostcodeSelector />).find('.PostcodeSelector').length).toBe(1);
    });

    it('should contain a for attribute on the form label', function() {
        let forAttributeIndex = postcodeSelectorComponent
            .find('label')
            .first()
            .html()
            .indexOf('for')
        let gotForAttribute = forAttributeIndex > 0 ? true : false;
        expect(gotForAttribute).toEqual(true);
    });
});
