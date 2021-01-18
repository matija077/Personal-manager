import { useState } from 'react';
import { useQuotesContext } from '../../containers/home.container';
import { quoteType, contextType, quotesType } from '../../graphQL/types';

import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles
} from './Quote.styles';

type QuotePropsType = {
    children: never[];
}

const initialQuote: quoteType = {
    author: undefined,
    text: ""
}

function Quote(props: QuotePropsType) {
    var quote: quoteType = initialQuote;
    var quotesObject: contextType<quotesType> = useQuotesContext();

    if (quotesObject?.data !== undefined) {
        quote = quotesObject?.data.quotes[2]
    } else if (!quotesObject?.loading) {
        console.error("no data to show");
    }

    return(
        quotesObject?.loading ?
            <span>Loading</span>
        :
        <QuoteContainerStyles
        >
            <QuoteStyles>
                {quote.text || null}
            </QuoteStyles>
            <QuoteAuthorStyles>
                {quote?.author || null}
            </QuoteAuthorStyles>
        </QuoteContainerStyles>
    );
}

export default Quote;