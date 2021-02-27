import React from 'react';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import Header from './components/header/CHeader';

import GlobalStyles from './utility/styles/global.styles';

function CApp() {

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

export default CApp;
