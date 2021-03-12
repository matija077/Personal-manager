import styled from 'styled-components';

export type ButtonStylesPropsType = {
    backgroundColor?: string
}

const ButtonStyles = styled.button<ButtonStylesPropsType>`
    border-radius: 15rem/20rem;
    background-color: ${props => props.backgroundColor
        ? props.backgroundColor
        : props.theme.colors.secondary.main
    };
    text-align: center;
`;

const BoxStyles = styled.div`

`;

export {
    ButtonStyles,
    BoxStyles
};