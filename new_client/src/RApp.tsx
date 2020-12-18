import React from 'react';

import { Provider } from 'react-redux';

import store from './redux/store';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import Header from './components/header/RHeader';

import GlobalStyles from './global.styles';

function RApp() {

    return(
        <ErrorBoundary>
            <Provider store={store}>
                <React.Fragment>
                    <GlobalStyles />
                    <Header>

                    </Header>
                    <HomePage>
                    </HomePage>
                </React.Fragment>
            </Provider>
        </ErrorBoundary>
    );
}

export default RApp;
