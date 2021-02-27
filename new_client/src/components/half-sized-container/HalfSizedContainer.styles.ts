import styled from 'styled-components';


const ContainerStyles = styled.main`
    position: absolute;
    left: 25%;
    top: 25%;
    bottom: 25%;
    right: 25%;
    overflow: auto;
    display: grid;
    grid-template-rows: [header-start] 1fr [header-end main-start] 4fr [main-end footer-start] 1fr [footer-end];
    grid-template-columns: 1fr;
    overflow-y: scroll;

    background-color: white;
    padding: 10px;
    box-sizing: content-box;

    @media all and (max-width: 600px), (max-height: 600px) {
        & {
            font-size: 10px;

        }
    }

`;

export {
    ContainerStyles
};