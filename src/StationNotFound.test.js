import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import StationNotFound from './StationNotFound';
import { Notifications, Notification } from './Notifications';

const electoral_services = { council_id: 'test', name: 'Example Council' };
configure({ adapter: new Adapter() });

describe('StationNotFound', () => {
    const notifications = [
        {
            type: 'voter_id',
            url: 'https://www.example.com',
            title: 'You need ID',
            detail: 'you really will need ID',
        },
    ];

    it('always renders header', () => {
        const wrapper = mount(<StationNotFound />);

        expect(wrapper).toContainReact(<h2 id="dc_header">{"We couldn't find your station"}</h2>);
    });

    it('should present council to get in touch with', () => {
        const wrapper = mount(<StationNotFound electoral_services={electoral_services} />);

        expect(wrapper).toContainReact(
            <span id="dc_get_in_touch">
                Get in touch with <b>Example Council</b>:
            </span>
        );
    });

    it('should present NI Electoral Office for N09 postcodes', () => {
        const electoral_services = { council_id: 'N09 1XA' };
        const wrapper = mount(<StationNotFound electoral_services={electoral_services} />);

        expect(wrapper).toContainReact(
            <span id="dc_get_in_touch">
                Get in touch with <b>The Electoral Office for Northern Ireland</b>:
            </span>
        );
    });

    describe('should present contact details', () => {
        const electoral_services = {
            council_id: 'N09 1XA',
            website: 'example.com',
            phone: '118 118',
            email: 'test@example.com',
        };

        it('via website', () => {
            const wrapper = mount(<StationNotFound electoral_services={electoral_services} />);

            expect(wrapper).toContainReact(
                <li>
                    Website - <a href="example.com">example.com</a>
                </li>
            );
        });

        it('via phone', () => {
            const wrapper = mount(<StationNotFound electoral_services={electoral_services} />);

            expect(wrapper).toContainReact(<li>Phone - 118 118</li>);
        });

        it('via email', () => {
            const wrapper = mount(<StationNotFound electoral_services={electoral_services} />);

            expect(wrapper).toContainReact(
                <li>
                    Email - <a href="mailto:test@example.com">test@example.com</a>
                </li>
            );
        });
    });

    it('does not show notification when there is no event to be aware of', () => {
        const wrapper = mount(
            <StationNotFound electoral_services={electoral_services} notifications={[]} />
        );
        expect(wrapper).not.toContainReact(<Notification />);
    });

    it('shows notification when there is a voter id pilot', () => {
        const wrapper = mount(
            <StationNotFound
                electoral_services={electoral_services}
                notifications={notifications}
            />
        );
        expect(wrapper).toContainReact(<Notifications list={notifications} />);
    });
});
