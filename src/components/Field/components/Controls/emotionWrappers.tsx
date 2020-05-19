import styled from '@emotion/styled';
export const ControlsWrapper = styled.div``;
export const SmallInput = styled.input(() => ({
    backgroundColor: '',
    color: '#4D2A0C',
    border: '2px solid #B5A99D',
    borderRadius: '20px',
    padding: '10px',
    fontSize: '14px',
    margin: '0 10px 5px 0',
    width: '50px',
    ':focus': {
        transitionDuration: '0.3s',
        borderColor: '#4D2A0C',
    },
}));
SmallInput.displayName = 'SmallInput';
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
Input.displayName = 'Input';
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
OutlineBtn.displayName = 'OutlineBtn';
export const Btn = styled.button(() => ({
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
Btn.displayName = 'Btn';
export const BrownSubmit = styled.input(() => ({
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
BrownSubmit.displayName = 'BrownSubmit';
export const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
`;
