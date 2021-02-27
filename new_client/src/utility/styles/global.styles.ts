import { createGlobalStyle  } from 'styled-components';
// import img from './assets/background.jpg';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 62.5%;
    }

    *, *:before, *:after: {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
    }
    
    body{       
        // font -family:
    }

    h1, h2, h3, h4, h5 {
        font-weight: 100;
        line-height: 1.2;
    }

    #root{
        display: flex;
        flex-direction: column;
    }
`;

export default GlobalStyle;