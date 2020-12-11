import React from 'react';

function ErrorPage({ error }) {
    console.log(error);
    return (
        <article className="errorArticle">
            {
                JSON.stringify(error)
            }
        </article>
    );
}

export default ErrorPage;