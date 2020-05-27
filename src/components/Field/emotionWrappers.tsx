import styled from '@emotion/styled';

export const Game = styled.div((props: { isAnimation: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    color: '#4D2A0C',
    minHeight: '90vh',
    position: 'relative',
    backgroundColor: '#fcf1e4',
    '&::after': {
        content: props.isAnimation ? '""' : 'none',
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
export const FieldContainer = styled.div(() => ({
    backgroundColor: 'white',
    border: '2px solid #4D2A0C',
    width: 'max-content',
}));
export const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`;
