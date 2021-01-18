import { createGlobalStyle  } from 'styled-components';
// import img from './assets/background.jpg';

var GlobalStyle = createGlobalStyle`
    body{
        background-color: white;
        padding: 0;
        margin: 0;
    }

    #root{
        display: flex;
        flex-direction: column;
    }
`;

export default GlobalStyle;