import { css } from 'styled-components';

var homePageSectionContainerStyles = css`
    background-color: hsl(250, 48%, 85%, 0.5);
    flex: 1 0 0;
    margin: 1vh 0;
    overflow: hidden;
`;

var mainPlaceholderStyles = css`
    box-sizing: border-box;
    flex: 0 1 96vh;
    margin: 5px;
`;

var headerStyles = css`
    box-sizing: border-box;
    margin-bottom: 5px;
    flex: 0 0 4vh;
`;

export {
    homePageSectionContainerStyles,
    mainPlaceholderStyles,
    headerStyles
};