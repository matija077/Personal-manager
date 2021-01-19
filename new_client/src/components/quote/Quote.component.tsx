import { useState, useEffect, useLayoutEffect } from 'react';
import { useQuotesContext } from '../../containers/home.container';
import { quoteType, contextType, quotesType } from '../../graphQL/types';

import { useError } from '../../utility/customHooks.utils';

import Spinner from '../spinner/spinner.component';

import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles
} from './Quote.styles';

type QuotePropsType = {
    children: never[];
}

enum PossibleStates  {
    "begining",
    "loading",
    "error"
}

const INITIAL_QUOTE: quoteType = {
    author: undefined,
    text: ""
}

function Quote(props: QuotePropsType) {
    var quote: quoteType = INITIAL_QUOTE;
    var quotesObject: contextType<quotesType> = useQuotesContext();
    var [possibleStates, setPossibleStates]: [PossibleStates, Function] = useState<PossibleStates>(PossibleStates.begining);
    var [error, setError] = useError();

    /*if (quotesObject) {
        quotesObject.loading = true;
    }*/

    useLayoutEffect(() => {
        setTimeout(() => {
            setPossibleStates(PossibleStates.loading);
        }, 200)

        setTimeout(() => {
            setPossibleStates(PossibleStates.error);
        }, 2800)
    }, [])

    // TODO - call warning component
    if (possibleStates === PossibleStates.error && quotesObject?.loading) {
        setError("errrrorrr");
    }

    if (quotesObject?.data !== undefined) {
        quote = quotesObject?.data.quotes[2]
    } else if (!quotesObject?.loading) {
        console.error("no data to show");
    }

    return(
        <>
            {possibleStates === PossibleStates.loading && quotesObject?.loading ?
                <Spinner
                    positionFixed={false}
                >
                </Spinner>
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
            }
        </>
    );
}

export default Quote;