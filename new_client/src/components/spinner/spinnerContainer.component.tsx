import Spinner from './spinner.component';

function withSpinnerContainer(Component: React.ElementType): React.ElementType {
    return function SpinnerContainer({ isLoading, ...otherProps }) {

        return (
            isLoading ?
                <Spinner
                    positionFixed={true}
                >
                </Spinner>
            :
                (<Component {...otherProps}></Component>)

        );
    }
}

export default withSpinnerContainer;