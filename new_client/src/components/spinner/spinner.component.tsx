
import { SpinnerStyles, SpinnerStylesContainer } from './spinner.styles';

type SpinnerPropsType = {
    children: never[],
    positionFixed: boolean
}

function Spinner({ positionFixed }: SpinnerPropsType) {
    return (
    <SpinnerStylesContainer
        positionFixed={positionFixed}
    >
        <SpinnerStyles>
        </SpinnerStyles>
    </SpinnerStylesContainer>
    );
}

export default Spinner;