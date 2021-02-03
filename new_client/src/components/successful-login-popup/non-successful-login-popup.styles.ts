import styles from 'styled-components';

const NonSuccessfulLoginPopupStyles = styles.article`
    position: fixed;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    background-color: red;
    box-shadow:  0 0 1rem 5rem blue;
    animation: fade 2s linear 1s;
    @keyframes fade {
        0% {
            opacity: 0.8;
        }
        50% {
            opacity: 0.4;
        }
        75% {
            opacity: 0.2;
        }
        100% {
            opacity: 0;
        }
    }
`;

const NonSuccessfulLoginPopupTextStyles = styles.p`
    font-size: 2rem;
    text-shadow: 0.1em 0.1em 0.3em black;
`;

export {
    NonSuccessfulLoginPopupStyles,
    NonSuccessfulLoginPopupTextStyles
}