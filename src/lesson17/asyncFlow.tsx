import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { getSwapiForCurrentPeople } from '@/lesson17/thunk';
import { State, store } from './reducer';

export const makeRequest = (dispatch: any) => {
    dispatch({ type: 'LOADING' });

    return fetch('https://swapi.dev/api/people/')
        .then(async (data) => {
            dispatch({ type: 'SUCCESS', data: await data.json() });
        })
        .catch((error) => dispatch({ type: 'FAILED', error }));
};

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

    return (
        <div>
            <button onClick={() => makeRequest(dispatch)}>Make an api request</button>
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
