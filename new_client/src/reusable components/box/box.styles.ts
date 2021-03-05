import styled from 'styled-components';

export type ButtonStylesPropsType = {
    backgroundColor?: string
    width?: string;
    minWidth?: string,
    height?: string
}

const ButtonStyles = styled.button<ButtonStylesPropsType>`
    border-radius: 15rem/20rem;
    background-color: ${props => props.backgroundColor
        ? props.backgroundColor
        : props.theme.colors.secondary.main
    };
    text-align: center;
    padding: 1em;
    height: fit-content;
    width: ${props => props.width ?? "fit-content"};
    height: ${props => props.height ?? "fit-content"};
    min-width: ${props => props.minWidth ?? "fit-content"};
`;

const BoxStyles = styled.div`

`;

export {
    ButtonStyles,
    BoxStyles
};