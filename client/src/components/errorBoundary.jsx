import React, { Suspense } from 'react';

var errorImportString = `../pages/error.page`;

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            error: null
        };
    };

    static getDerivedStateFromError(error) {
        console.log(error);
        // console.log(" tu sam");
        return {
            error
        };
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
        // console.log(" tu sam");
    }

    render() {
        var { error } = this.state;
        var { children } = this.props;

        if (error) {
            var ErrorPage;
            //ErrorPage = React.lazy(() => import(errorImportString));
            return (
                <Suspense
                    fallback={<article>Loading</article>}
                >
                    <ErrorPage
                        error={error}
                    >
                    </ErrorPage>
                </Suspense>
            )
        } else {
            return (
                {...children}
            );
        }
    }
}

export default ErrorBoundary;