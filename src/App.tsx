import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginScreen } from '@/screens/LoginScreen';
import { GameScreen } from '@/screens/GameScreen';
import { NotFoundScreen } from '@/screens/NotFoundScreen';
import { Redirect } from 'react-router-dom';
import { authorizedOnlyHoc } from '@/utils/authorizedOnlyHOC';

const loginScreen = authorizedOnlyHoc(LoginScreen, '/game', true);
const gameScreen = authorizedOnlyHoc(GameScreen, '/login');
export const App: React.FC<{}> = () => (
    <Router>
        <Switch>
            <Redirect from="/" to={'/login'} exact />
            <Route path="/login" component={loginScreen} />
            <Route path="/game" component={gameScreen} />
            <Route path="*">
                <NotFoundScreen />
            </Route>
        </Switch>
    </Router>
);
