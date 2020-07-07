/*
Курс React, урок 17: Middlewares
Домашнее задание 2
src/lesson17/homework/thunk.ts
Напишите свой thunk middleware и подключите в приложение
+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты
*/
import { Dispatch } from 'redux';

export const getSwapiForCurrentPeople = () => (dispatch: Dispatch, getState: Function) => {
    dispatch({ type: 'LOADING' });

    fetch(`https://swapi.dev/api/people/`)
        .then(async (data) => dispatch({ type: 'SUCCESS', data: await data.json() }))
        .catch((error) => dispatch({ type: 'ERROR', error }));
};
