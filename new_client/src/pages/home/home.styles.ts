import styled, {css} from 'styled-components';

import { mainPlaceholderStyles } from '../../components/reusable styles';

type MainContainerStylesPropsType = {
    popup: 0 | 1 | 2 | null
}

var MainStyles = styled.main`
    ${mainPlaceholderStyles}
    border: 2px solid;
    padding: 20px 10px;
`;

var MainContainerStyles = styled.div<MainContainerStylesPropsType>`
    height: 96vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${(props) => {
        console.log(props);
        if (props.popup) {
            return css`filter: blur(2px)`
        } else {
            return null
        }
    }}
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
    PopupContainerStyles,
    MainContainerStyles
};