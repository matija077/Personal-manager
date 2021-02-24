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
import ProtectedRoute from './reusable components/protected route/protected_route.component';

import { default as Header } from './components/header/RHeader';

import { client } from '../src/graphQL/graphQL'
import { ApolloProvider } from '@apollo/client';

import GlobalStyles from './global.styles';

var Summary = React.lazy(() => import('./pages/summary/Rsummary.page'));
var Login = React.lazy(() => import('./components/login/login.container'));
const User = React.lazy(() => import('./pages/user/user.container'));


function RApp() {

    return(
        <ErrorBoundary>
            <React.StrictMode>
                <Provider store={store}>
                    <ApolloProvider client={client}>
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
                                        <Suspense fallback="Loading">
                                            <Summary>
                                            </Summary>
                                        </Suspense>
                                    </Route>
                                    <Route path="/login">
                                        <Suspense fallback="Loading">
                                            <Login>
                                            </Login>
                                        </Suspense>
                                    </Route>
                                    <Route>
                                        <Suspense
                                            fallback="Loading"
                                        >
                                            <User />
                                        </Suspense>
                                    </Route>
                                    <Route>
                                        <HomePage>
                                        </HomePage>
                                    </Route>
                                </Switch>
                            </React.Fragment>
                        </Router>
                    </ApolloProvider>
                </Provider>
            </React.StrictMode>
        </ErrorBoundary>
    );
}

export default RApp;