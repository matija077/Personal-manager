import Spinner from './spinner.component';

function withSpinnerContainer(Component: React.ElementType): React.ElementType {
    return function SpinnerContainer({ isLoading, ...otherProps }) {

        return (
            isLoading ?
                <Spinner />
            :
                (<Component {...otherProps}></Component>)

        );
    }
}

export default withSpinnerContainer;