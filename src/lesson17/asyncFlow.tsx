import { useSelector, useDispatch } from 'react-redux';
import { createStore, Reducer } from 'redux';
import * as t from './actionTypes';

import * as React from 'react';
import { getSwapiForCurrentPeople } from '@/lesson17/thunk';

type State = {
    isLoading: boolean;
    data: any | null;
    error: Error | null;
};

export const initialState: State = {
    isLoading: false,
    data: null,
    error: null,
};

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING:
            return { ...state, isLoading: true };
        case t.SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data,
                error: null,
            };
        case t.FAILED:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error,
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

export const store = createStore(reducer);

export function Lesson17App() {
    const state = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const thunkDispatch = (action: any) => {
        if (typeof action === 'function') {
            action(thunkDispatch, store.getState);
            return;
        }
        if (action.meta && action.meta.probability) {
            const random = Math.random();
            if (action.meta.probability > random) {
                dispatch(action);
            }
            return;
        }
        dispatch(action);
    };
    const makeRequest = () => {
        dispatch({ type: 'LOADING' });

        return fetch('https://swapi.dev/api/people/')
            .then(async (data) => {
                dispatch({ type: 'SUCCESS', data: await data.json() });
            })
            .catch((error) => dispatch({ type: 'FAILED', error }));
    };
    return (
        <div>
            <button onClick={makeRequest}>Make an api request</button>
            <button onClick={() => thunkDispatch(getSwapiForCurrentPeople())}>
                {' '}
                Test thunk middleware
            </button>
            <button
                onClick={() =>
                    thunkDispatch({ type: 'ANALYTICS_CLICK', meta: { probability: 0.5 } })
                }
            >
                Test probability middleware
            </button>
            {state.isLoading && <div>Loading...</div>}
            {state.error && <div style={{ color: 'red' }}>{state.error.message}</div>}
            {state.data && (
                <>
                    <p>{JSON.stringify(state.data, undefined, 2)}</p>
                </>
            )}
        </div>
    );
}
