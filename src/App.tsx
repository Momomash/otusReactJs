import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginScreen } from '@/screens/LoginScreen';
import { GameScreen } from '@/screens/GameScreen';
import { NotFoundScreen } from '@/screens/NotFoundScreen';
import { Redirect } from 'react-router-dom';
import { authorizedOnlyHoc } from '@/utils/authorizedOnlyHOC';

export const App: React.FC<{}> = () => (
    <Router>
        <Switch>
            <Route path="/" exact>
                <Redirect to={'/login'} />
            </Route>
            <Route path="/login" component={authorizedOnlyHoc(LoginScreen, '/game', true)} />
            <Route path="/game" component={authorizedOnlyHoc(GameScreen, '/login')} />
            <Route path="*">
                <NotFoundScreen />
            </Route>
        </Switch>
    </Router>
);
