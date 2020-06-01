import styled from '@emotion/styled';

export const Game = styled.div((props: { isAnimation: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    color: '#4D2A0C',
    minHeight: '90vh',
    position: 'relative',
    backgroundColor: '#fcf1e4'
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
