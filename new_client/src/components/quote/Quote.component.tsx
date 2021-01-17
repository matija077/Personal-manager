import { useState } from 'react';
import { useQuotesContext } from '../../containers/home.container';
import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles
} from './Quote.styles';

type QuotePropsType = {
    quote?: {
        author: string,
        text: string
    }
    children: never[];
}


function Quote({ quote = undefined }: QuotePropsType) {
    /*var quote = "Do or do not. There is no try.";
    var author = "Yoda";*/

    var quotes = useQuotesContext();
    console.log(quotes);

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