import { createReducer, createStore } from '@reduxjs/toolkit';
import * as t from '@/lesson17/actionTypes';

export type State = {
    isLoading: boolean;
    data: any | null;
    error: Error | null;
};

export const initialState: State = {
    isLoading: false,
    data: null,
    error: null,
};

export const reducer = createReducer(initialState, {
    [t.LOADING]: (state) => {
        state.isLoading = true;
    },
    [t.SUCCESS]: (state, action) => {
        (state.isLoading = false), (state.data = action.data), (state.error = null);
    },
    [t.FAILED]: (state, action) => {
        (state.isLoading = false), (state.data = null), (state.error = action.error);
    },
    [t.ANALYTICS_CLICK]: (state) => {
        (state.isLoading = false), (state.data = 'Click'), (state.error = null);
    },
});

export const store = createStore(reducer);
