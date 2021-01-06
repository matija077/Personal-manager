import { useState, useRef, useEffect, useLayoutEffect, useCallback, Ref, MutableRefObject } from 'react';

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
    text: string,
    password: string,
    valid: boolean,
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
        text: "",
        password: "",
        valid: true,
    })
    var { loginState, text: email, password, valid } = state;

    var inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
    var timerId: MutableRefObject<NodeJS.Timeout | undefined> = useRef();
    useLogger("valid state ", state.valid);

    function checkAndToggleValidity(): void {
        const isValid = checkValidity();
        console.log("checker method");

        if (isValid !== valid) {
            setState((state) => ({
                ...state,
                valid: !state.valid
            }));
        }
    }

    const checkAndToggleValidityMemo = useCallback(
        checkAndToggleValidity,
        [valid],
    )

    useEffect(() => {
        timerId.current = setTimeout(() => {
            console.log("runing");
            checkAndToggleValidity();
        }, 1500);

        return () => {
           timerId && clearTimeout(timerId.current as NodeJS.Timeout);
        }
    }, [state.text, state.password, checkAndToggleValidity])


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
                inputType={"text"}
                clickHandler={processEmailAndPasswordHandler}
                value={email}
                valueChanged={onValueChanged}
                inputRef={inputRef}
                valid={valid}
                pointerLeaveHandler={pointerLeaveHandler}
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
                pointerLeaveHandler={pointerLeaveHandler}
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

    function checkValidity(useLength: boolean = false): boolean {
        const regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        const validityObject = inputRef.current?.validity || {valid: false};
        const length = inputRef?.current?.value?.length || 0;
        const value = inputRef?.current?.value as string;
        console.log(validityObject);
        var valid = true;
        console.log(regex.test(value));

        if (useLength && length === 0) {
            valid = false;
        }

        /*if (!validityObject?.valid) {
            valid = false;
        }*/
        if (value !== undefined && !regex.test(value)) {
            valid = false;
        }

        return valid;
    }

    function pointerLeaveHandler(event: React.SyntheticEvent<HTMLInputElement>) {
        timerId.current && clearTimeout(timerId.current);
        console.log("wroking");
        //checkAndToggleValidityMemo();

    }

    // valid pops withotu stzles being applied
    // return adn setState
    function processEmailAndPasswordHandler() {
        if (!checkValidity(true)) {
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