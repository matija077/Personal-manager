import styled from 'styled-components';

var SpinnerStylesContainer = styled.article`
    position: fixed;
    top: 20%;
    bottom: 20%;
    width: 100%;
    height: 60vh;
`;

var SpinnerStyles = styled.figure`
    position: relative;
    left: 25vw;
    width: 50vw;
    height: 100%;
    margin: 0;
    padding: 0;
    animation: spin 2s ease-in-out infinite;
    border: 1vw dotted blue;
    border-radius: 50%;
    background-color: green;
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export {
    SpinnerStyles,
    SpinnerStylesContainer
};