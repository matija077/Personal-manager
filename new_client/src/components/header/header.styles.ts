import styled from 'styled-components';
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

var HeaderItemStyles = styled(Link)`
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    flex: 1 0 auto;
    min-width: 80px;
    width: 14.25%;
    text-align: center;

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

export {
    HeaderStyles,
    HeaderItemStyles
};