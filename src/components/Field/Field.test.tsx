import * as React from 'react';
import { mount, shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { Field } from './Field';

describe('Field', () => {
    it('check states with default sizex Field', () => {
        const wrapper = shallow(<Field />);
        expect(wrapper.state('sizeX')).toBe(10);
        expect(wrapper.state('sizeY')).toBe(10);
    });

    it('check states with custom sizeX and sizeY after checked submit', () => {
        const wrapper = shallow(<Field />);
        const sizeXInput = wrapper.find('input[name="sizeX"]');
        const sizeYInput = wrapper.find('input[name="sizeY"]');
        sizeXInput.simulate('change', { target: { value: 15 } });
        sizeYInput.simulate('change', { target: { value: 20 } });
        setTimeout(() => {
            expect(wrapper.update().state('sizeX')).toBe(15);
            expect(wrapper.update().state('sizeY')).toBe(20);
        }, 100);
    });
});
