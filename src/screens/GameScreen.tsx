import React from 'react';
import { Field } from '@/components';
import { logout, getLogin } from '@/api/auth';
import { RouteComponentProps } from 'react-router-dom';
import { Header, OutlineBtn } from '@/components/emotionWrapper';
import styled from '@emotion/styled';

export const H1 = styled.div(() => ({
    marginBottom: '20px',
}));

type State = {
    name: string | null;
};
export class GameScreen extends React.PureComponent<RouteComponentProps<{}>, State> {
    componentDidMount(): void {
        getLogin().then((name) => {
            this.setState({ name: name });
        });
    }

    logout = async () => {
        await logout();
        this.props.history.push('/');
    };
    state = {
        name: '',
    };
    render() {
        return (
            <div>
                <Header>
                    <H1>Hello, {this.state.name} !</H1>
                    <OutlineBtn onClick={this.logout}>Logout</OutlineBtn>
                </Header>
                <Field />
            </div>
        );
    }
}
