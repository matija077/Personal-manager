import React, { Suspense } from 'react';

// var errorImportString = `../pages/error.page`;
import ErrorPage from '../../pages/error/error.page';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            'error': null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            error
        };
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    render() {
        var { error } = this.state;
        var { children } = this.props;

        if (error) {
            //var ErrorPage = React.lazy(() => import(errorImportString));
            return (
                <Suspense
                    fallback={<article>Loading</article>}
                >
                    <ErrorPage
                        error={error}
                    / >
                </Suspense>
            );
        } else {
            return (
                {...children}
            );
        }
    }
}

export default ErrorBoundary;