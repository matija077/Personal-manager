import React from 'react';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';

import GlobalStyles from './global.styles';
import { MainStyles } from './app.styles';

function App() {

    return(
        <ErrorBoundary>
            <MainStyles>
                <GlobalStyles />
                <HomePage>
                </HomePage>
            </MainStyles>
        </ErrorBoundary>
    );
}

export default App;