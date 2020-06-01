import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '@/api/auth';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
export enum CheckState {
    initiated,
    succeed,
    failed,
}

export const Placeholder = styled.div(() => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    color: '#4D2A0C',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#fcf1e4',
    '&::after': {
        content: '""',
        backgroundImage: 'url("src/img/pusheen.gif")',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fcf1e4',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    },
}));

export const authorizedOnlyHoc = <Props extends object>(
    Component: React.ComponentType<Props>,
    redirectPath: string,
    isAuthorizedRedirect?: boolean,
) => (props: Props) => {
    const [isAuthorized, setIsAuthorized] = useState(CheckState.initiated);

    useEffect(() => {
        (async () => {
            const isAuthorized = await isLoggedIn();
            setIsAuthorized(isAuthorized ? CheckState.succeed : CheckState.failed);
        })();
    }, []);

    if (isAuthorized === CheckState.initiated) {
        return <Placeholder> ffff</Placeholder>;
    }

    if (!isAuthorizedRedirect && isAuthorized === CheckState.failed) {
        return <Redirect to={redirectPath} />;
    }
    if (isAuthorizedRedirect && isAuthorized === CheckState.succeed) {
        return <Redirect to={redirectPath} />;
    }

    return <Component {...props} />;
};
