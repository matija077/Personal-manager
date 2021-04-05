import styled from 'styled-components';
import MainStylesBox from "../main-styles-box/mainStylesBox";

export type BorderType = {
    width: string,
    style: string
    color: string
}
type ButtonStylesPropsType = {
    border?: BorderType
}


function borderCalculateHelper(border: BorderType) {
    return `${border.width} ${border.style} ${border.color}`
}

const ButtonStyles = styled(MainStylesBox)<ButtonStylesPropsType>`
    border: ${props => props.border && borderCalculateHelper(props.border)};
    border-radius: 15rem/20rem;
`;

export {
    ButtonStyles
}