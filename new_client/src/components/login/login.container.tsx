import Login from './login';

import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';

function LoginContainer(props: any) {

    function loginPickerHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
        console.dir(event.target);
        
        if (event.currentTarget.dataset.id === "google") {
            singInWithGoogle();
        } else {
            console.log("emai land apssword");
        }
    }

    return (
        <Login
            clickHandler={loginPickerHandler}
        >
        </ Login>
    );

}

export default LoginContainer;