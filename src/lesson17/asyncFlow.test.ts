import * as t from './actionTypes';
import { reducer, initialState } from './reducer';
import { makeRequest } from './asyncFlow';

describe('test actions and reducer', () => {
    describe('actions', () => {
        const data = {};
        const mock = { json: async () => data };
        const dispatch = jest.fn();

        it('success action', async () => {
            window.fetch = jest.fn().mockResolvedValue(mock);
            await makeRequest(dispatch);
            expect(dispatch).toBeCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOADING' });
            expect(dispatch.mock.calls[1][0]).toEqual({ type: 'SUCCESS', data });
        });
        it('failed action', async () => {
            window.fetch = jest.fn().mockRejectedValue('error');
            await makeRequest(dispatch);
            expect(dispatch).toBeCalledTimes(2);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOADING' });
            expect(dispatch.mock.calls[1][0]).toEqual({ type: 'FAILED', error: 'error' });
        });
    });

    describe('reducer', () => {
        it('LOADING dispatched', () => {
            const loadingAction = () => {
                return {
                    type: t.LOADING,
                };
            };
            expect(reducer(initialState, loadingAction())).toEqual({
                ...initialState,
                isLoading: true,
            });
        });
        it('SUCCESS dispatched', () => {
            const successAction = () => {
                return {
                    type: t.SUCCESS,
                    data: 'test data',
                };
            };
            expect(reducer(initialState, successAction())).toEqual({
                ...initialState,
                isLoading: false,
                data: successAction().data,
                error: null,
            });
        });
        it('FAILED dispatched', () => {
            const failedAction = () => {
                return {
                    type: t.FAILED,
                    error: 'failed error',
                };
            };
            expect(reducer(initialState, failedAction())).toEqual({
                ...initialState,
                isLoading: false,
                data: null,
                error: failedAction().error,
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
