import React from 'react';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import StationNotFound from './StationNotFound';

const council = { council_id: 'test', name: 'Example Council' };

describe('StationNotFound', () => {
    it('always renders header', () => {
        const wrapper = shallow(<StationNotFound />);

        expect(wrapper).toContainReact(<h2 id="dc_header">We couldn't find your station</h2>);
    });

    it('should present council to get in touch with', () => {
        const wrapper = shallow(<StationNotFound council={council}/>);

        expect(wrapper).toContainReact(<span id="dc_get_in_touch">Get in touch with <b>Example Council</b>:</span>);
    });

    it('should present NI Electoral Office for N09 postcodes', () => {
        const council = { council_id: 'N09 1XA' }
        const wrapper = shallow(<StationNotFound council={council}/>);

        expect(wrapper).toContainReact(<span id="dc_get_in_touch">Get in touch with <b>The Electoral Office for Northern Ireland</b>:</span>);
    });

    describe('should present contact details', () => {
        const council = { council_id: 'N09 1XA', website: 'example.com', phone: '118 118', email: 'test@example.com' }

        it('via website', () => {
            const wrapper = shallow(<StationNotFound council={council}/>)

            expect(wrapper).toContainReact(<li>Website - <a href="example.com">example.com</a></li>);
        });

        it('via phone', () => {
            const wrapper = shallow(<StationNotFound council={council}/>)

            expect(wrapper).toContainReact(<li>Phone - 118 118</li>);
        });

        it('via email', () => {
            const wrapper = shallow(<StationNotFound council={council}/>)

            expect(wrapper).toContainReact(<li>Email - <a href="mailto:test@example.com">test@example.com</a></li>);
        });
    });
});