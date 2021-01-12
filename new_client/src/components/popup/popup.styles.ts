import styled from 'styled-components';

var PopupStyles = styled.article`
    position: absolute;
    top: 10vh;
    bottom: 10vh;
    left: 10vw;
    right: 10vw;
    padding: 1%;
    background-clip: padding-box;
    background-color: hsl(180, 62%, 60%);
    display: grid;
    box-shadow:0 0 1rem 1rem white;
    animation: fadeIn 1s ease-in ;

    @keyframes fadeIn {
        0%{
            opacity: 0.2;
        }

        50%{
            opacity: 0.6;
        }

        100% {
            opacity: 1;
        }
    }
`;

export {
    PopupStyles
}