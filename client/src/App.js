import React from 'react';

import './App.css';

import ErrorBoundary from './components/errorBoundary';
import HomePage from './pages/home/home.page';

function App() {

    return(
        <ErrorBoundary>
            <main className="main">
                Hello There
                <HomePage></HomePage>
            </main>
        </ErrorBoundary>
    );
}

export default App;