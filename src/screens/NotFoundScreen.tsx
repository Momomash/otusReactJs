import React from 'react';
import { Container, H1Center } from '@/screens/emotionWrapper';

export class NotFoundScreen extends React.Component {
    render() {
        return (
            <Container>
                <img src="src/img/404.gif" width="200px" alt="404" />
                <H1Center>404 ! :(</H1Center>
            </Container>
        );
    }
}
