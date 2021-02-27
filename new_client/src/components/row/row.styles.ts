import styled from 'styled-components';

type RowStylesPropsType = {
    percantageLeft: number,
    percantageRight: number
}

const RowStyles = styled.article<RowStylesPropsType>`
box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: ${(props) => props.percantageLeft}fr ${(props) => props.percantageRight}fr;
    justify-items: stretch;
    align-items: center;
    width: 100%;
    grid-template-areas: 'left right';
    padding-left: 5%;
    padding-right: 5%;
    grid-gap: 5%;
`;

export {
    RowStyles
}