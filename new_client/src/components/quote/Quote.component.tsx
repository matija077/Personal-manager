import { Component } from 'react';
import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles
} from './Quote.styles';

type QuotePropsType = {
    children: never[];
}


function Quote({ }: QuotePropsType) {
    var quote = "Do or do not. There is no try.";
    var author = "Yoda";

    return(
        <QuoteContainerStyles
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