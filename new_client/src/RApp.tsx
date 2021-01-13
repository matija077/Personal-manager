import React, { Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { gql } from '@apollo/client';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';
import { default as Header } from './components/header/RHeader';

import GlobalStyles from './global.styles';

var Summary = React.lazy(() => import('./pages/summary/Rsummary.page'));
var Login = React.lazy(() => import('./components/login/login.container'));

var client = new ApolloClient({
    uri: 'http://localhost:5012/graphql',
    cache: new InMemoryCache()
});

client.query({
    query: gql`
        query getQuotes {
            getQuotes{
                author
                text
            }

        }
    `
}).then(function resolved(result) {
    console.log(result);
})

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
