import styled from 'styled-components';

import cancelSvg from '../../assets/cancel.svg';

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
    border: 20% solid black;
    width: 2vw;
    height: 5vh;
    overflow: hidden;
    cursor: pointer;
    background-image: url(${cancelSvg});
    background-origin: border-box;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

export {
    CloseStyles
}