import { useState, useRef, useEffect, Ref, MutableRefObject } from 'react';

import Login from './login';
import EmailAndPasswordLogin from './loginEmailAndPassword';
import { HTMLEventElement } from '../../utility/typescript.utils';

import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';
import { login } from '../../redux/utils';
import { usePersistedStorage, useError, useLogger } from '../../utility/customHooks.utils';

type renderType = {
    [key1: string]: JSX.Element,
    "0": JSX.Element,
    "1": JSX.Element,
    "2": JSX.Element,
}

type stateType = {
    loginState: 0 | 1 | 2,
    email: string,
    password: string,
    valid: boolean
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
        password: "",
        valid: true,
    })
    const { loginState, email, password, valid } = state;

    var inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();

    function onValueChanged(event: HTMLEventElement<HTMLInputElement>) {
        const inputType = event.target.type;

        setState({
            ...state,
            [inputType]: event.target.value
        });
    }

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
                inputRef={inputRef}
                valid={valid}
            >

            </EmailAndPasswordLogin>,
        2:
            <EmailAndPasswordLogin
                inputType={"password"}
                clickHandler={processEmailAndPasswordHandler}
                value={password}
                valueChanged={onValueChanged}
                inputRef={inputRef}
                valid={valid}
            >
            </EmailAndPasswordLogin>
    } as renderType;

    function loginPickerHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
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

    // valid pops withotu stzles being applied
    // return adn setState
    function processEmailAndPasswordHandler() {
        const validityObject = inputRef.current?.validity || {valid: false};
        const length = inputRef?.current?.value?.length || 0;

        if (!validityObject?.valid || length === 0) {
            inputRef?.current?.focus();

            setState({
                ...state,
                valid: false
            })
            return;
        }

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