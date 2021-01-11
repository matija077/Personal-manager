import { css } from 'styled-components';

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
    mainPlaceholderStyles,
    headerStyles
};