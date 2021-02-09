import styled from 'styled-components';

const ContainerStyles = styled.main`
    position: absolute;
    width: 50vw;
    height: 50vh;
    left: 25%;
    top: 25%;
    border: 1em solid aqua;
    border-radius: 1em;
    background-color: lightgray;
    box-shadow: 1em 1em 0.2em 1em azure;
    overflow: auto;
    display: grid;
    grid-template-rows: [header-start] 1fr [header-end main-start] 4fr [main-end footer-start] 1fr [footer-end];
    grid-template-columns: 1fr;
`;

export {
    ContainerStyles
};