import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user-reducer/user.selectors';
import { React } from '@ungap/global-this';

type ProtectedRoute = {
    children: (props: any) => React.ReactNode
}

function ProtectedRoute({ Component, ...rest }: any) {
    const user = useSelector(getUser);
    console.log(Component);

    return (
        <Route
            {...rest}
        >
            {
                user.nickname
                    ? <Component />
                    : <Redirect to="/login"></Redirect>
            }
        </Route>
    );
}

export default ProtectedRoute;