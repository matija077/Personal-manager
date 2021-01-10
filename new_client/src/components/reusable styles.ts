import { css } from 'styled-components';

var homePageSectionContainerStyles = css`
    background-color: hsl(250, 48%, 85%, 0.5);
    flex: 1 0 0;
    margin: 1vh 0;
    overflow: hidden;
    padding: 5px;

    &:hover{
        box-shadow: 10px 10px 5px gray;
    }

    @media all and (max-width: 400px) {
        &:hover{
            box-shadow: 5px 5px 2.5px gray;
        }
    }
`;

var mainPlaceholderStyles = css`
    box-sizing: border-box;
    flex: 0 1 96vh;
    margin: 5px;


    @media all and (max-height: 600px) and  (max-width: 400px) {
        font-size: 10px;
    }

    @media all and (max-height: 400px) and  (max-width: 600px) {
        font-size: 10px;
    }
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