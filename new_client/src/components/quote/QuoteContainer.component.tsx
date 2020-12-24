import Quote from './Quote.component';

function QuoteContainer() {
    var quote = "Do or do not. There is no try.";
    var author = "Yoda";

    return (
        <Quote
            quote={quote}
            author={author}
        >
        </Quote>
    );
}

export default QuoteContainer;