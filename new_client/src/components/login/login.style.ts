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
    padding: 0.5rem;
`;


var LoginPickerLabelStyles = styled.label`
    ${loginPlaceholder}
`;

var LoginEmailAndPasswordLabelStyles = styled.label`
    ${loginPlaceholder}
    margin-bottom: 0.5rem;
`;

var LoginPickerButton = styled.button`
    ${loginPlaceholder}
    width: 75%;
    margin-top: 0.5rem;
    background-color: yellow;
    box-sizing: content-box;
`;

type LoginInputStylesPropsType = {
    type: String
}

var LoginInputStyles = styled.input<LoginInputStylesPropsType>`
    ${loginPlaceholder}
    width: 75%;

    &.invalid {
        border: 0.5rem dashed red;
    }
`;

export {
    LoginStyles,
    LoginPickerLabelStyles,
    LoginEmailAndPasswordLabelStyles,
    LoginPickerButton,
    LoginInputStyles
};