import { Component } from 'react';
import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles
} from './Quote.styles';

type QuotePropsType = {
    quote: {
        author: string,
        text: string
    }
    children: never[];
}


function Quote({ quote }: QuotePropsType) {
    /*var quote = "Do or do not. There is no try.";
    var author = "Yoda";*/

    return(
        <QuoteContainerStyles
        >
            <QuoteStyles>
                {quote?.text || null}
            </QuoteStyles>
            <QuoteAuthorStyles>
                {quote?.author || null}
            </QuoteAuthorStyles>
        </QuoteContainerStyles>
    );
}

export default Quote;