import styled from 'styled-components';

type CloseStylesPropsType = {
    position?: PositionType
}

export type PositionType = {
        left?: string | null
        right?: string | null
        top?: string | null
        bottom?: string | null
}

var CloseStyles = styled.aside.attrs<CloseStylesPropsType>(({position}) => ({
    right: position?.right ? position.right : null,
    top: position?.top ? position.top : null,
    left: position?.left ? position.left : null,
    bottom: position?.bottom ? position.bottom : null
}))<CloseStylesPropsType>`
    position: absolute;
    right: ${({position}) => position?.right};
    top: ${({position}) => position?.top};
    left: ${({position}) => position?.left};
    bottom: ${({position}) => position?.bottom};
    border: 2px solid black;
    width: 5vw;
    height: 5vh;
    overflow: hidden;
    cursor: pointer;
`;

export {
    CloseStyles
}