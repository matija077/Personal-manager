
import { SpinnerStyles, SpinnerStylesContainer, SpinnerStylesOutsideContainer } from './spinner.styles';

type SpinnerPropsType = {
    children: never[],
    positionFixed: boolean
}

function Spinner({ positionFixed }: SpinnerPropsType) {
    return (
    <SpinnerStylesOutsideContainer>
        <SpinnerStylesContainer
            positionFixed={positionFixed}
        >
            <SpinnerStyles>
            </SpinnerStyles>
        </SpinnerStylesContainer>
    </SpinnerStylesOutsideContainer>
    );
}

export default Spinner;