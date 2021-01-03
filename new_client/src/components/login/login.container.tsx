import Login from './login';
import EmailAndPasswordLogin from './loginEmailAndPassword';

import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';
import { useState } from 'react';

type renderType = {
    "0": JSX.Element,
    "1": JSX.Element,
    "2": JSX.Element
}

function LoginContainer(props: any) {
    var [loginState, setLoginState] = useState(0);
    // fix type
    var render = {
        0: 
            <Login
                clickHandler={loginPickerHandler}
                state={loginState}
            >
            </ Login>,
        1: 
            <EmailAndPasswordLogin
                inputType={"Email"}
                clickHandler={processEmailAndPasswordHandler}
            >

            </EmailAndPasswordLogin>,
        2: 
            <EmailAndPasswordLogin
                inputType={"password"}
                clickHandler={processEmailAndPasswordHandler}
            >
            </EmailAndPasswordLogin>
    } as any;

    function loginPickerHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
        console.dir(event.target);
        
        if (event.currentTarget.dataset.id === "google") {
            singInWithGoogle();
        } else {
            setLoginState(1);
        }
    }

    function processEmailAndPasswordHandler() {
        
    }

    return (
        render[loginState.toString()]
    );

}

export default LoginContainer;