import { Dispatch } from 'redux';

export const getSwapiForCurrentPeople = () => (dispatch: Dispatch, getState: Function) => {
    dispatch({ type: 'LOADING' });

    return fetch(`https://swapi.dev/api/people/`)
        .then(async (data) => dispatch({ type: 'SUCCESS', data: await data.json() }))
        .catch((error) => dispatch({ type: 'ERROR', error }));
};
