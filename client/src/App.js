import React from 'react';

import './App.css';

import ErrorBoundary from './components/errorBoundary';

function App() {

    return(
        <ErrorBoundary>
            <main className="main">
                Hello There
            </main>
        </ErrorBoundary>
    );
}

export default App;