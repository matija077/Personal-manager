import styled from 'styled-components';
import { Link } from 'react-router-dom';

var HeaderStyles = styled.main`
    border: 2px solid;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-evenly;
`;

var HeaderItemStyles = styled(Link)`
    cursor: pointer;
    color: inherit;
    text-decoration: none;
`;

export {
    HeaderStyles,
    HeaderItemStyles
};