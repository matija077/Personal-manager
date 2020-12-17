import React from 'react';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import Header from './components/header/RHeader';

import GlobalStyles from './global.styles';

function RApp() {

    return(
        <ErrorBoundary>
            <React.Fragment>
                <GlobalStyles />
                <Header>

                </Header>
                <HomePage>
                </HomePage>
            </React.Fragment>
        </ErrorBoundary>
    );
}

export default RApp;
