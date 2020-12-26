import styled, { css } from 'styled-components';

var homePageSectionContainerStyles = css`
    background-color: blue;
    border: 0.5vw solid;
    border-radius: 10%;
`;

var TodaysTasksStyles = styled.section`
    ${homePageSectionContainerStyles}
`;

export {
    TodaysTasksStyles
};