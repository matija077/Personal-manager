import styled, { css } from 'styled-components';

var LoginStyles = styled.main`
    position: relative;
    width: 30vw;
    height: 50vh;
    top: 25vh;
    left: 35vw;
    filter: contrast(300%);
    background-color: blue;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

var loginPlaceholder = css`
    filter: contrast(100%);
    text-align: center;
`;


var LoginPickerLabelStyles = styled.label`
    ${loginPlaceholder}
    
    
`;

var LoginPickerButton = styled.button`
    ${loginPlaceholder}
    width: 75%;
    margin-top: 0.5rem;
    background-color: yellow;
`;


export {
    LoginStyles,
    LoginPickerLabelStyles,
    LoginPickerButton
};