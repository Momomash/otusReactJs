import * as React from 'react';
import { mount } from 'enzyme';
import { Field } from './Field';
import { generateAge } from './helpers';
import { CellStatus } from './components/Cell';
//const sleep = (x: number) => new Promise((r) => setTimeout(r, x));
describe('Field test', () => {
    const wrapper = mount(<Field />);
    let cells: Array<Array<CellStatus>> = wrapper.state('cells');
    it('check states with default sizex Field', () => {
        expect(wrapper.state('sizeX')).toBe(10);
        expect(wrapper.state('sizeY')).toBe(10);
    });

    it('check  sizeX, sizeY inputs and submit button', async () => {
        wrapper
            .find('SmallInput[name="sizeX"]')
            .simulate('change', { target: { value: 15, name: 'sizeX' } });
        wrapper
            .find('SmallInput[name="sizeY"]')
            .simulate('change', { target: { value: 20, name: 'sizeY' } });
        wrapper.find('BrownSubmit[name="generateField"]').simulate('submit');
        wrapper.find('BrownSubmit[name="generateField"]').simulate('submit');
        wrapper.update();
        expect(cells.length).toBe(20);
        expect(cells[0].length).toBe(15);
        expect(wrapper.state('sizeX')).toBe(15);
        expect(wrapper.state('sizeY')).toBe(20);
    });

    it('check playerName input', async () => {
        wrapper
            .find('Input[name="playerName"]')
            .simulate('change', { target: { value: 'Bob', name: 'playerName' } });
        expect(wrapper.update().state('playerName')).toBe('Bob');
    });
    it('check fullness input', async () => {
        wrapper
            .find('SmallInput[name="fullness"]')
            .simulate('change', { target: { value: 40, name: 'fullness' } });
        expect(wrapper.update().state('fullness')).toBe(40);
    });
    it('check randomly fill cells button ', async () => {
        const newCells = JSON.parse(JSON.stringify(cells));
        wrapper.find('Btn[name="randomlyFillButton"]').simulate('click');
        wrapper.update();
        expect(JSON.stringify(cells)).not.toBe(JSON.stringify(newCells));
    });
    it('check start button and toggle status cell', async () => {
        const newCells = Array.from(cells);
        for (let i = 0; i < newCells.length; i++) {
            for (let j = 0; j < newCells[i].length; j++) {
                newCells[i][j] = CellStatus.Empty;
            }
        }
        cells = newCells;
        cells[0][0] = CellStatus.Living;
        cells = generateAge(cells);
        wrapper.find('OutlineBtn[name="runGame"]').simulate('click');
        expect(cells[0][0]).toBe(CellStatus.Empty);
    });
    it('check reset button effect', async () => {
        wrapper.setState({ ageCounter: 5 });
        wrapper.update();
        wrapper.find('OutlineBtn[name="resetGame"]').simulate('click');
        expect(wrapper.update().state('ageCounter')).toBe(0);
    });
    it('check slower button effect', async () => {
        wrapper.find('OutlineBtn[name="slowerGame"]').simulate('click');
        expect(wrapper.update().state('delay')).toBe(1000);
    });
    it('check  delay input', async () => {
        wrapper
            .find('SmallInput[name="delay"]')
            .simulate('change', { target: { value: 1100, name: 'delay' } });
        wrapper.update();
        expect(wrapper.state('delay')).toBe(1100);
    });
    it('check faster button effect', async () => {
        wrapper.setState({ delay: 1000 });
        wrapper.update();
        wrapper.find('OutlineBtn[name="fasterGame"]').simulate('click');
        expect(wrapper.update().state('delay')).toBe(500);
    });
});
