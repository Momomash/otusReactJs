import styled from '@emotion/styled';

export const Input = styled.input(() => ({
    backgroundColor: '',
    color: '#4D2A0C',
    border: '2px solid #B5A99D',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    margin: '0 10px 5px 0',
    ':focus': {
        transitionDuration: '0.3s',
        borderColor: '#4D2A0C',
    },
}));
export const BrownSubmit = styled.button(() => ({
    backgroundColor: '#4D2A0C',
    border: '2px solid #4D2A0C',
    color: '#F9EBDE',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    marginRight: '10px',
    ':hover': {
        backgroundColor: '#6b513a',
        transitionDuration: '0.3s',
        color: '#F9EBDE',
    },
}));
export const OutlineBtn = styled.button(() => ({
    backgroundColor: '#B5A99D',
    color: '#F9EBDE',
    border: '2px solid #4D2A0C',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    marginRight: '10px',
    ':hover': {
        backgroundColor: '#4D2A0C',
        transitionDuration: '0.3s',
        color: '#F9EBDE',
    },
}));
export const Container = styled.div(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh',
}));
export const H1Center = styled.div(() => ({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '40px',
    color: '#4D2A0C',
}));
export const Header = styled.div(() => ({
    background: '#4D2A0C',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#F9EBDE',
    fontSize: '12px',
    padding: '5px',
}));
