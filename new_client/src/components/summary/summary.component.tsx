import {
    SummaryContainerStyles
} from './summary.styles';

import { popupsComponentPropsType } from '../../pages/home/home.page';

type SummaryProps = {
    children: never[];
}

function Summary({ onClickHandler, component }: SummaryProps & popupsComponentPropsType) {
    return(
        <SummaryContainerStyles
            onClick={onClickHandler}
            data-id={component}
        >
            SUMMARY COMPONENT
        </SummaryContainerStyles>
    );
}

export default Summary;