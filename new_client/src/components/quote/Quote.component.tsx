import {
    QuoteStyles,
    QuoteAuthorStyles,
    QuoteContainerStyles } from './Quote.styles';

type QuoteProps = {
    quote: string,
    author: string,
    children: never[]
};

function Quote(props: QuoteProps) {
    return(
        <QuoteContainerStyles>
            <QuoteStyles>
                {props.quote}
            </QuoteStyles>
            <QuoteAuthorStyles>
                {props.author}
            </QuoteAuthorStyles>
        </QuoteContainerStyles>
    );
}

export default Quote;