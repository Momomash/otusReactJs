import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { login } from '@/api/auth';
import { Input, BrownSubmit, Container, H1Center } from '@/screens/emotionWrapper';

type State = {
    name: string;
};

class LoginScreenComponent extends React.Component<RouteComponentProps<any>, State> {
    state = {
        name: '',
    };
    handleSubmit = async (ev: any) => {
        ev.preventDefault();
        await login(this.state.name);
        this.props.history.push(`/game/`);
    };
    handleChange = (event: any): void => {
        const target = event.target;
        const name: string = target.name;
        this.setState({ ...this.state, [name]: target.value });
    };

    render(): JSX.Element {
        return (
            <Container>
                <H1Center>
                    Hello!
                    <br /> Enter your name for start game!
                </H1Center>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="Enter your name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <BrownSubmit>Login</BrownSubmit>
                </form>
            </Container>
        );
    }
}

export const LoginScreen = withRouter(LoginScreenComponent);
