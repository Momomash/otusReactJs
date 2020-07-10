import * as t from './actionTypes';
import { reducer, initialState } from './reducer';
import { makeRequest } from './asyncFlow';

describe('test actions and reducer', () => {
    describe('actions', () => {
        const data = {};
        const mock = { json: async () => data };
        const dispatch = jest.fn();

        it('success action', async () => {
            // @ts-ignore
            window.fetch = jest.fn(() => {
                const promise = new Promise(function (resolve, reject) {
                    resolve(mock);
                });
                return promise;
            });
            await makeRequest(dispatch);
            expect(dispatch).toBeCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOADING' });
            expect(dispatch.mock.calls[1][0]).toEqual({ type: 'SUCCESS', data });
        });
        it('failed action', async () => {
            // @ts-ignore
            window.fetch = jest.fn(() => {
                const promise = new Promise(function (resolve, reject) {
                    reject();
                });
                return promise;
            });
            await makeRequest(dispatch);
            expect(dispatch).toBeCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOADING' });
            expect(dispatch.mock.calls[1][0]).toEqual({ type: 'FAILED' });
        });
    });

    describe('reducer', () => {
        it('LOADING dispatched', () => {
            const action = {
                type: t.LOADING,
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isLoading: true,
            });
        });
        it('SUCCESS dispatched', () => {
            const action = {
                type: t.SUCCESS,
                data: 'test data',
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isLoading: false,
                data: action.data,
                error: null,
            });
        });
        it('FAILED dispatched', () => {
            const action = {
                type: t.FAILED,
                error: 'failed error',
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isLoading: false,
                data: null,
                error: action.error,
            });
        });
        it('ANALYTICS_CLICK dispatched', () => {
            const action = {
                type: t.ANALYTICS_CLICK,
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isLoading: false,
                data: 'Click',
                error: null,
            });
        });
    });
});
