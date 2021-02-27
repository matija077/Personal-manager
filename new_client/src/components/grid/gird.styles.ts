import styled, { css } from 'styled-components';

type GridStylesPropsType = {
    sizeOfElement: number
};

const GridStyles = styled.div<GridStylesPropsType>`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, [row-input-start] ${(props) => props.sizeOfElement/2}%  [row-input-end]
        [row-label-start] ${(props) => props.sizeOfElement/2}%  [row-label-end]);
    justify-items: stretch;
    align-items: stretch;
    text-align: left;
`;

export {
    GridStyles
};