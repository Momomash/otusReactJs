import React from 'react';
import { Field } from '@/components';
import { logout } from '@/api/auth';
import { RouteComponentProps } from 'react-router-dom';
import { Header, OutlineBtn } from '@/screens/emotionWrapper';

interface RouteParams {
    name: string;
}
const getPlayerName = () => {
    return localStorage.getItem('login');
};

export class GameScreen extends React.PureComponent<RouteComponentProps<RouteParams>, {}> {
    logout = async () => {
        await logout();
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <Header>
                    <h1 style={{ marginRight: '20px' }}>Hello, {getPlayerName()} !</h1>
                    <OutlineBtn onClick={this.logout}>Logout</OutlineBtn>
                </Header>
                <Field />
            </div>
        );
    }
}
