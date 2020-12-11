import React from 'react';

function ErrorPage({ error }) {
    console.log(error);
    return (
        <article
            className="errorArticle"
            style={{backgroundImage: "url('../assets/error.png')"}}
            >
        </article>
    );
}

export default ErrorPage;