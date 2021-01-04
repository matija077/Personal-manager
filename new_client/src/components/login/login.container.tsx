import { useState, useRef } from 'react';

import Login from './login';
import EmailAndPasswordLogin from './loginEmailAndPassword';
import { HTMLEventElement } from '../../utility/typescript.utils';

import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';
import { login } from '../../redux/utils';
import { usePersistedStorage, useError } from '../../utility/customHooks.utils';

type renderType = {
    [key1: string]: JSX.Element,
    "0": JSX.Element,
    "1": JSX.Element,
    "2": JSX.Element,
}

type stateType = {
    loginState: 0 | 1 | 2,
    email: string,
    password: string
}

type LoginContainerPropsType = {
    children: []
};

function LoginContainer(props: LoginContainerPropsType) {
    var [error, setError] = useError();
    if (error) {
        throw error;
    }

    var [state, setState] = useState<stateType>({
        loginState: 0,
        email: "",
        password: ""
    })
    const { loginState, email, password } = state;

    function onValueChanged(event: HTMLEventElement<HTMLInputElement>) {
        console.dir(event.target);
        const inputType = event.target.type;

        setState({
            ...state,
            [inputType]: event.target.value
        });

    }

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
                value={email}
                valueChanged={onValueChanged}
            >

            </EmailAndPasswordLogin>,
        2:
            <EmailAndPasswordLogin
                inputType={"password"}
                clickHandler={processEmailAndPasswordHandler}
                value={password}
                valueChanged={onValueChanged}
            >
            </EmailAndPasswordLogin>
    } as renderType;

    function loginPickerHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
        console.dir(event.target);

        if (event.currentTarget.dataset.id === "google") {
            singInWithGoogle();
        } else {
            setState(
                {
                    ...state,
                    loginState: 1
                }
            );
        }
    }

    function processEmailAndPasswordHandler() {
        if (loginState === 1) {
            setState({
                ...state,
                loginState: 2
            })

            return;
        }

        login(email, password).
            //singInWithGoogle().
            then(function resolved(result: any) {
                console.log(result);
                //setUserObjectMemo(result.user.displayName);
            }).
            catch(function rejected(error: PromiseRejectedResult) {
                console.log("error while login in");
                console.log(error);
                setError(error);
            });
    }

    return (
        render[loginState.toString()]
    );

}

export default LoginContainer;