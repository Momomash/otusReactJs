/*
Курс React, урок 17: Middlewares
Домашнее задание 1
src/lesson17/homework/asyncFlow.ts
Напишите async flow который сходит в https://swapi.dev/api/people и сохранит данные в стейте
Нужна обработка различных состояний запроса и тесты
+1 балл за async flow который сохранит данные в стейте
+1 балл за обработку состояний реквеста в пути и ошибок
+1 балл за тесты
+1 балл за разнение по разных файлам и объединение в duck
*/

// Action creators

// Thunks

// Reducer

import { useSelector, useDispatch } from 'react-redux';
import { createStore, Reducer } from 'redux';

import * as React from 'react';

type State = {
    isLoading: boolean;
    data: any | null;
    error: Error | null;
};

const initialState: State = {
    isLoading: false,
    data: null,
    error: null,
};

export const reducer: Reducer<State> = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, isLoading: true };
        case 'SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data,
                error: null,
            };
        case 'FAILED':
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error,
            };
        default:
            return state;
    }
};

export const store = createStore(reducer);

export function Lesson17App() {
    const state = useSelector((state: State) => state);
    const dispatch = useDispatch();

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
