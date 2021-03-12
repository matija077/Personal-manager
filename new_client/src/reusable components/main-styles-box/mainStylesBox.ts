import styled, { css } from 'styled-components';

type MainStylesBoxPropsType = {
    width?: string;
    minWidth?: string,
    minHeight?: string,
    height?: string
};


const MainStylesBox = styled.div<MainStylesBoxPropsType>`
    padding: 1em;
    width: ${props => (props.width && props.theme.size(props.width)) ?? "fit-content"};
    height: ${props => props.height ?? "fit-content"};
    min-width: ${props => props.minWidth ?? "fit-content"};
    min-height: ${props => props.minHeight ?? "fit-content"};
`;

export default MainStylesBox;