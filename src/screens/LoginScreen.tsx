import { Input, BrownSubmit, Container, H1Center } from '@/components/emotionWrapper';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '@/api/auth';

export const LoginScreen: React.FC<{}> = () => {
    const [name, setName] = useState('');
    const history = useHistory();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.preventDefault();
        await login(name);
        history.push(`/game/`);
    };
    const handleChange = (event: any) => {
        const target = event.target;
        const name: string = target.name;
        setName(target.value);
    };
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
                    onChange={handleChange}
                />
                <BrownSubmit>Login</BrownSubmit>
            </form>
        </Container>
    );
};
