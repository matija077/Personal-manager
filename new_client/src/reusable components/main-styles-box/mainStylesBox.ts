import styled, { css } from 'styled-components';

type MainStylesBoxPropsType = {
    width?: string;
    minWidth?: string,
    minHeight?: string,
    height?: string
    maxHeight?: string,
    maxWidth?: string
};


const MainStylesBox = styled.div<MainStylesBoxPropsType>`
    padding: 1em;
    width: ${props => props.theme.size(props.width)};
    height: ${props => props.theme.size(props.height)};
    min-width: ${props => props.minWidth};
    min-height: ${props => props.minHeight};
    max-width: ${props => props.maxHeight};
    max-height: ${props => props.maxWidth};
`;

export default MainStylesBox;