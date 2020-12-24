import React, { Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import Header from './components/header/RHeader';
import Spinner from './components/spinner/spinner.component';
import WithSpinner from './components/spinner/spinnerContainer.component';

import GlobalStyles from './global.styles';

var Summary = React.lazy(() => import('./pages/summary/Rsummary.page'));

var WithSpinnerContainer = WithSpinner(Summary);

function RApp() {

    return(
        <ErrorBoundary>
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        <React.Fragment>
                            <GlobalStyles />

                            <Header />

                            <Switch>
                                <Route exact path="/">
                                    <HomePage>
                                    </HomePage>
                                </Route>
                                <Route path="/summary">
                                    <Suspense fallback={<Spinner></Spinner>}>
                                        <WithSpinnerContainer isLoading="true"></WithSpinnerContainer>
                                    </Suspense>
                                </Route>
                                <Route>
                                    <HomePage>
                                    </HomePage>
                                </Route>
                            </Switch>
                        </React.Fragment>
                    </Router>
                </Provider>
            </React.StrictMode>
        </ErrorBoundary>
    );
}

export default RApp;
