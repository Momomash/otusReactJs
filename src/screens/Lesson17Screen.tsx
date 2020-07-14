import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../lesson17/asyncFlow';
import { Lesson17App } from '../lesson17/asyncFlow';

export class Lesson17Screen extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Lesson17App />
            </Provider>
        );
    }
}
