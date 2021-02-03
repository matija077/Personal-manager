import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { headerStyles } from '../reusable styles';

var HeaderStyles = styled.main`
    ${headerStyles}
    border: 2px solid;
    padding: 5px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

const HeaderItemOnHooverCss = css`
     &:hover {
        box-sizing: border-box;
        background-color: hsla(172, 100%, 84%, 0.33);
        background-clip: content-box;
        font-size: 1.2em;
        padding: 1px;
        border: 2px double blue;
        border-radius: 10px;
        filter: contrast(190%);
    }
`;

const HeaderItemCss = css`
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    flex: 1 0 auto;
    min-width: 80px;
    width: 14.25%;
    text-align: center;
`;

const HeaderItemStyles = styled(Link)`
    ${HeaderItemCss}
    ${HeaderItemOnHooverCss};
`;

const HeaderItemContainerStyles = styled.div`
    ${HeaderItemCss}
    display: flex;
    justify-content: center;
`;

const HeaderContainerItemStyles = styled(HeaderItemStyles)`
    ${HeaderItemCss};
    ${HeaderItemOnHooverCss};
    flex: 1 0 auto;
    min-width: 40px;
    width: 50%;
`;

export {
    HeaderStyles,
    HeaderItemStyles,
    HeaderItemContainerStyles,
    HeaderContainerItemStyles
};