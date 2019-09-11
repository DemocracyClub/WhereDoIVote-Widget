import React from 'react';
import { BuiltByDC, StartAgainButton } from './Branding';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

import { childAttributeChecker } from './utils/test';

configure({ adapter: new Adapter() });

describe('Branding Components Accessibility', () => {
    let builtByDcComponent;
    let builtByDcContains;
    let startAgainButtonComponent;
    let startAgainContains;

    beforeEach(() => {
        builtByDcComponent = shallow(<BuiltByDC />);
        builtByDcContains = childAttributeChecker(builtByDcComponent);
        startAgainButtonComponent = shallow(<StartAgainButton />);
        startAgainContains = childAttributeChecker(startAgainButtonComponent);
    });

    it('builtByDcComponent should include a title attribute on the Democracy Club hyperlink', () => {
        expect(builtByDcContains('a','title')).toEqual(true);
    });

    it('Start again button should have an aria labels and titles', () => {
        expect(startAgainContains('button', 'aria-label')).toEqual(true);
        expect(startAgainContains('button', 'title')).toEqual(true);
    });
});
