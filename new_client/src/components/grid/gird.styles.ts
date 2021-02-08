import styled, { css } from 'styled-components';

type GridStylesPropsType = {
    sizeOfElement: number
};

const GridStyles = styled.div<GridStylesPropsType>`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, [row-start] ${(props) => props.sizeOfElement}%  [row-end]);
`;

export {
    GridStyles
};