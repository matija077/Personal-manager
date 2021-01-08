import { createGlobalStyle  } from 'styled-components';
import img from './assets/background.jpg';

var GlobalStyle = createGlobalStyle`
    body{
        background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyle;