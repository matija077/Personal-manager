import { Component } from 'react';
import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles } from './Quote.styles';

import { popupsComponentPropsType } from '../../pages/home/home.page';


function Quote({ onClickHandler, component }: popupsComponentPropsType) {
    var quote = "Do or do not. There is no try.";
    var author = "Yoda";

    return(
        <QuoteContainerStyles
            onClick={onClickHandler}
            data-id={component}
        >
            <QuoteStyles>
                {quote}
            </QuoteStyles>
            <QuoteAuthorStyles>
                {author}
            </QuoteAuthorStyles>
        </QuoteContainerStyles>
    );
}

export default Quote;