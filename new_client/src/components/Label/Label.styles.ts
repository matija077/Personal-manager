import styled from 'styled-components';

export enum textAlign {
    "left" = "left",
    "center" = "center",
    "right" = "right"
}

type LabelStylesPropsType = {
    textAlign?: textAlign
}

const LabelStyles = styled.label<LabelStylesPropsType>`
    text-align: ${(props) => props.textAlign};
`;

export {
    LabelStyles
};