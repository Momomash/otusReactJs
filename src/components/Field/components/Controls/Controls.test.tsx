import * as React from 'react';
import { mount } from 'enzyme';
import { Controls } from './Controls';

const onSubmit = jest.fn();
describe('Controls test', () => {
    const Function = jest.fn();
    const wrapper = mount(
        <Controls
            delay={500}
            fasterGame={Function}
            fullness={30}
            handleChange={Function}
            handleSubmit={Function}
            handleSubmitAuthorization={Function}
            pauseGame={Function}
            randomlyFill={Function}
            resetGame={Function}
            runGame={Function}
            sizeX={10}
            sizeY={10}
            slowerGame={Function}
        />,
    );
    it('check playerName input', () => {
        wrapper.find('Input[name="playerName"]').simulate('change');
        expect(Function).toHaveBeenCalled();
    });
    it('check sizeX input', () => {
        wrapper.find('SmallInput[name="sizeX"]').simulate('change');
        expect(Function).toHaveBeenCalled();
    });
    it('check sizeY input', () => {
        wrapper.find('SmallInput[name="sizeY"]').simulate('change');
        expect(Function).toHaveBeenCalled();
    });
    it('check generateField submit', () => {
        wrapper.find('BrownSubmit[name="generateField"]').simulate('submit');
        expect(Function).toHaveBeenCalled();
    });
    it('check fullness input', () => {
        wrapper.find('SmallInput[name="fullness"]').simulate('change');
        expect(Function).toHaveBeenCalled();
    });
    it('check runGame button', () => {
        wrapper.find('OutlineBtn[name="runGame"]').simulate('click');
        expect(Function).toHaveBeenCalled();
    });
    it('check pauseGame button', () => {
        wrapper.find('OutlineBtn[name="pauseGame"]').simulate('click');
        expect(Function).toHaveBeenCalled();
    });
    it('check slowerGame button', () => {
        wrapper.find('OutlineBtn[name="slowerGame"]').simulate('click');
        expect(Function).toHaveBeenCalled();
    });
    it('check delay input', () => {
        wrapper.find('SmallInput[name="delay"]').simulate('change');
        expect(Function).toHaveBeenCalled();
    });
    it('check fasterGame button', () => {
        wrapper.find('OutlineBtn[name="fasterGame"]').simulate('click');
        expect(Function).toHaveBeenCalled();
    });
});
