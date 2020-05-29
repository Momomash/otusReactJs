import { Input, BrownSubmit, Container, H1Center } from '@/screens/emotionWrapper';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '@/api/auth';

export const LoginScreen: React.FC<{}> = () => {
    const [name, setName] = useState('');
    const history = useHistory();
    const handleSubmit = useCallback(
        async (ev) => {
            ev.preventDefault();
            await login(name);
            history.push(`/game/`);
        },
        [name],
    );
    return (
        <Container>
            <H1Center>
                Hello!
                <br /> Enter your name for start game!
            </H1Center>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(ev) => setName((ev.target as HTMLInputElement).value)}
                />
                <BrownSubmit>Login</BrownSubmit>
            </form>
        </Container>
    );
};

