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

    useEffect(() => {
        setState((state) => {
            return {
                ...state,
                email: "",
                password: "",
                valid: true
            }
        })
    }, [state.loginState])

    function disableInvalidOnInvalid() {
        console.log("usao sam");
        if (!valid) {
            setState((state) => ({
                ...state,
                valid: true
            }));
        }
    }

    function checkAndToggleValidity(): boolean {
        const isValid = checkValidity();

        if (isValid !== valid) {
            setState((state) => ({
                ...state,
                valid: !state.valid
            }));

            return false;
        }

        return true;
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
                onPointerEnterHandler={onPointerEnterHandler}
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
                onPointerEnterHandler={onPointerEnterHandler}
            >
            </EmailAndPasswordLogin>
    } as renderType;

    function onValueChanged(event: HTMLEventElement<HTMLInputElement>) {
        const inputType = event.target.type;
        disableInvalidOnInvalid();

        setState((state) => { return{
            ...state,
            [inputType]: event.target.value
        }});    
    }

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
        var valid = true;
        const length = inputRef?.current?.value?.length || 0;
        const value = inputRef?.current?.value as string;

        function checkEmailAndPassword() {
            const regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
            
            if (length === 0) {
                if (useLength) {
                    valid = false;
                } else {
                    valid = true;
                    return valid;
                }
            }
            
            if (value !== undefined && !regex.test(value)) {
                valid = false;
            }

            return valid;
        }

        function checkPassword() {
            if (length < 4 && length > 0) {
                valid = false;
            }
        }

        if (loginState === 1) {
            return  checkEmailAndPassword();
        } else if (loginState === 2) {
            checkPassword()
        } else {
            valid = false;
        }

        return valid;
    }

    function onPointerEnterHandler(event: any) {
        disableInvalidOnInvalid();
    }

    // valid pops withotu stzles being applied
    // return adn setState
    function processEmailAndPasswordHandler() {
        if (!checkAndToggleValidity()) {
            inputRef?.current?.focus();

            /*setState({
                ...state,
                valid: false
            })*/
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