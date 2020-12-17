import React, { useRef} from 'react';

import { ErrorStyles } from './error.styles';

function ErrorPage({ error }) {
    var backgroundImageUrl = `url(${window.document.URL}error.png)`;

    return (
        <ErrorStyles
            backgroundImageUrl = {backgroundImageUrl}
        >
            {
                JSON.stringify(error)
            }
        </ErrorStyles>
    );
}

export default ErrorPage;