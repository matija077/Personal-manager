import styled, { css } from 'styled-components';

export const InputTypes = {
    "text": "text",
    "email": "email"
}

type InputStylesPropsType = {

}

const mapOfStyles = {
    [InputTypes.email]: css`
    `,
    [InputTypes.text]: css`  `
}

const InputStyles = styled.input.attrs<InputStylesPropsType>(props => ({
    type: props.type ?? "text"
}))<InputStylesPropsType>`
    border: unset;
    border-bottom: 0.2rem solid gray;
    :focus {
        all: unset;
        border-bottom: 0.5rem solid #76ffff;
    }
    ${(props) => mapOfStyles[props.type ?? "text"]}
`;

export {
    InputStyles
};