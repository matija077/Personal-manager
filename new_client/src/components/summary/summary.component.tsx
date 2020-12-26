import {
    SummaryContainerStyles
} from './summary.styles';

type SummaryProps = {
    children: never[]
};

function Summary(props: SummaryProps) {
    return(
        <SummaryContainerStyles>
            SUMMARY COMPONENT
        </SummaryContainerStyles>
    );
}

export default Summary;