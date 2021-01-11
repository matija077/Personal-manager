import styled from 'styled-components';

import { mainPlaceholderStyles } from '../../components/reusable styles';

var MainStyles = styled.main`
    ${mainPlaceholderStyles}
    border: 2px solid;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

var PopupContainerStyles = styled.article`
    position: fixed;
    top: 10vh;
    bottom: 10vh;
    left: 10vw;
    right: 10vw;
`;

export {
    MainStyles,
    PopupContainerStyles
};