import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user-reducer/user.selectors';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';


function useProtectedRoute({ Component, ...rest }: any) {
    const user = useSelector(getUser);
    console.log(Component);
    console.log(rest);
    console.log(user);

    return (
        user.nickname
        ? <Component></Component>
        : <Redirect to='/login' />
    );
}

function Ala ()  { return (<div>asd</div> )}

export {
    useProtectedRoute
};

/*(
                user.nickname
                    ? <Component {...routeProps} ></Component>
                    : <Redirect to='/login' />
            )
            */

            /*
              <Route
            {...rest}
            render={(routeProps: any) => {
                console.log(user);
                return <Ala></Ala> }}
        ></Route>*/