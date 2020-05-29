import React from 'react';

import { LoginScreen } from './LoginScreen';
import { shallow } from 'enzyme';
import { login } from '@/api/auth';
import { Input } from '@/screens/emotionWrapper';

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

const mockHistory = { push: jest.fn() };
jest.mock('react-router-dom', () => ({
    useHistory: () => mockHistory,
}));

jest.mock('@/api/auth', () => ({
    login: jest.fn(),
}));

describe('LoginScreen', () => {
    it('navigates to game page on submit', async () => {
        const name = 'Gandalf';
        const screen = shallow(<LoginScreen />);

        screen.find(Input).simulate('change', { target: { value: name } });
        await screen.find('form').simulate('submit', { preventDefault: () => null });

        expect(login).toHaveBeenCalledWith(name);
        expect(mockHistory.push).toHaveBeenCalledWith(`/game/`);
    });
});
