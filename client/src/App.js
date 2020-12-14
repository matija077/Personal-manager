import React from 'react';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import Header from './components/header/header';

import GlobalStyles from './global.styles';

function App() {

    return(
        <ErrorBoundary>
            <div>
                <GlobalStyles />
                <Header>

                </Header>
                <HomePage>
                </HomePage>
            </div>
        </ErrorBoundary>
    );
}

export default App;