import React from 'react';

import './App.css';

import ErrorBoundary from './components/error-boundary/errorBoundary';
import HomePage from './pages/home/home.page';

import GlobalStyles from './global.styles';

function App() {

    return(
        <ErrorBoundary>
            <main className="main">
                <GlobalStyles />
                Hello There
                <HomePage></HomePage>
            </main>
        </ErrorBoundary>
    );
}

export default App;