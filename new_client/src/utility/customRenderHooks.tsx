import { useSelector } from 'react-redux';
import { getUser } from '../redux/user-reducer/user.selectors';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';


function useProtectedRoute(props: any) { 
    const user = useSelector(getUser);
    console.log("koji");

    return (
        <Route  
            {...props}
            render={(props: any) => {
                console.log(user);
                return (
                user.nickname
                    ? <props.Component {...props} > 
                    
                    </props.Component>
                    : <Redirect to='/' />
            )}} 
        ></Route>
    );
}

export {
    useProtectedRoute
};
