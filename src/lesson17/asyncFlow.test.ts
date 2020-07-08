import { initialState } from './asyncFlow';
import * as t from './actionTypes';
import { Reducer } from 'redux';

const testReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING:
            return { ...state, isLoading: true };
        case t.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: 'data',
                error: null,
            };
        case t.FAILED:
            return {
                ...state,
                isLoading: false,
                data: 'data',
                error: 'failed error',
            };
        case t.ANALYTICS_CLICK:
            return {
                ...state,
                isLoading: false,
                data: 'Click',
                error: null,
            };
        default:
            return state;
    }
};

describe('reducer', () => {
    it('LOADING dispatched', () => {
        const action = {
            type: t.LOADING,
        };
        expect(testReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    it('SUCCESS dispatched', () => {
        const action = {
            type: t.SUCCESS,
        };
        expect(testReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            data: 'data',
            error: null,
        });
    });
    it('FAILED dispatched', () => {
        const action = {
            type: t.FAILED,
        };
        expect(testReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            data: 'data',
            error: 'failed error',
        });
    });
    it('ANALYTICS_CLICK dispatched', () => {
        const action = {
            type: t.ANALYTICS_CLICK,
        };
        expect(testReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            data: 'Click',
            error: null,
        });
    });
});
