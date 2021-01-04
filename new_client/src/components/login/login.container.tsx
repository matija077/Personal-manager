import Login from './login';
import EmailAndPasswordLogin from './loginEmailAndPassword';
import { HTMLEventElement } from '../../utility/typescript.utils';

import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';
import { useState } from 'react';

type renderType = {
    [key1: string]: JSX.Element,
    "0": JSX.Element,
    "1": JSX.Element,
    "2": JSX.Element,
}

function LoginContainer(props: any) {
    var [loginState, setLoginState] = useState(0);
    var [inputValue, setInputValue] = useState("");

    function onValueChanged(event: HTMLEventElement<HTMLInputElement>) {
        setInputValue(event?.target?.value);
    }

    // fix type
    var render: {[key: string]: JSX.Element} = {
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
                value={inputValue}
                valueChanged={onValueChanged}
            >

            </EmailAndPasswordLogin>,
        2:
            <EmailAndPasswordLogin
                inputType={"password"}
                clickHandler={processEmailAndPasswordHandler}
                value={inputValue}
                valueChanged={onValueChanged}
            >
            </EmailAndPasswordLogin>
    } as renderType;

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