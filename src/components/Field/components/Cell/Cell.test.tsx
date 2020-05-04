import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

import { Cell, CellStatus } from './Cell';

describe('Cell', () => {
    it('render Empty Cell', () => {
        const status = CellStatus.Empty;
        expect(
            renderer.create(<Cell onClick={jest.fn()} status={status} />).toJSON(),
        ).toMatchSnapshot();
    });
    it('render Living Cell', () => {
        const status = CellStatus.Living;
        expect(
            renderer.create(<Cell onClick={jest.fn()} status={status} />).toJSON(),
        ).toMatchSnapshot();
    });
    it('calls onClick callback with passed status', () => {
        const onClick = jest.fn();
        const status = CellStatus.Empty;
        const wrapper = mount(<Cell onClick={onClick} status={status} />);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledWith();
    });
});
