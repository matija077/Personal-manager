import { useState, useRef, useEffect, MutableRefObject } from 'react';

import Login from './login';
import EmailAndPasswordLogin from './loginEmailAndPassword';
import { HTMLEventElement } from '../../utility/types/typescript.utils';
import Spinner from '../spinner/spinner.component';
import FailedAuthPopup from '../successful-login-popup/non-successfull-login-popup.component';

import { useHistory } from 'react-router';

import { singInWithGoogle } from '../../redux/utils.firebase';
import { login } from "../../utility/hooks/customAuthHooks";
import { useError } from '../../utility/hooks/customHooks.utils';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { login as loginDispatch } from '../../redux/user-reducer/user.actions';

type renderType = {
    [key1: string]: JSX.Element,
    "0": JSX.Element,
    "1": JSX.Element,
    "2": JSX.Element,
}

type authResultType = {
    isAuthenticated: boolean,
    nickname: string | null,
    email: string,
    token: string,
    expiresIn: string
}

type stateType = {
    loginState: 0 | 1 | 2,
    text: string,
    password: string,
    valid: boolean,
    loading: boolean,
    showPopup: boolean,
}

type LoginContainerPropsType = {
    children: []
};

const initalState: stateType = {
    loginState: 0,
    text: "",
    password: "",
    valid: true,
    loading: false,
    showPopup: false,
}

function LoginContainer(props: LoginContainerPropsType) {
    //console.log("re rednered");
    var [error, setError] = useError();
    if (error) {
        throw error;
    }

    const history = useHistory();

    var [state, setState] = useState<stateType>(initalState);
    var { loginState, text: email, password, valid, loading, showPopup } = state;
    var inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();
    const dispatch = useDispatch();

    // if we switch to passwrod we want to reset the state
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

    // idea is to turn valid to valid on each new value or pointer focusing our input field
    function disableInvalidOnInvalid() {
        if (!valid) {
            setState((state) => ({
                ...state,
                valid: true
            }));
        }
    }

    function checkAndToggleValidity(): boolean {
        const isValid = checkValidity();
        //console.log("check:" + isValid + "current:" + valid);

        if (isValid !== valid) {
            setState((state) => ({
                ...state,
                valid: !state.valid
            }));
        }

        return isValid;
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

    // intially we either choose googleSingIn or we move to Email and Password. for this
    // we hjave to change the loginStatr to 1 meaning email
    // error catching kidna does nto work
    function loginPickerHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
        if (event.currentTarget.dataset.id === "google") {
            try {
                singInWithGoogle();
            } catch (error) {
                setError(error);
            }
        } else {
            setState(
                {
                    ...state,
                    loginState: 1
                }
            );
        }
    }

    /*
    * if email do email check otherwise do password check. 1 and 2 loginStates
    */
    function checkValidity(): boolean {
        var valid = true;
        const length = inputRef?.current?.value?.length || 0;
        const value = inputRef?.current?.value as string;

        function checkEmail() {
            const regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

            if (value !== undefined && !regex.test(value)) {
                valid = false;
            }

            return valid;
        }

        function checkPassword() {
            if (length < 4 && length >= 0) {
                valid = false;
            }
        }

        if (loginState === 1) {
            checkEmail();
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

    function onTransitionedHandler(event: any) {
        console.log("wroking");
        setState((state) => {
            return {
                ...state,
                showPopup: false
            };
        })
    }

    function loginHandler({isAuthenticated, nickname, email, token, expiresIn}: authResultType) {
        if (!isAuthenticated) {
            setState((state) => {
                return {
                    ...initalState,
                    showPopup: true,
                };
            })
        } else {
            nickname = nickname as string;
            dispatch(loginDispatch({email, nickname, token, expiresIn}));
            history.replace("/");
        }
    }

    /*
    * if not valid make input focus and return. if semail then move to password
    * if passwrod then move to login
    */
    function processEmailAndPasswordHandler() {
        if (!checkAndToggleValidity()) {
            inputRef?.current?.focus();

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
            then(function resolved(result: AxiosResponse<authResultType>) {
                loginHandler({
                     ...result.data,
                     email
                });
            }).catch(function rejected(error: PromiseRejectedResult) {
                setError(error);
            });

        setState((state) => {return {...state, loading: true}})
    }

    return (
        <>
            {render[loginState.toString()]}
            {loading && <Spinner positionFixed={true}>
            </Spinner>}
            {showPopup ?
                <FailedAuthPopup
                    onTransitionedHandler={onTransitionedHandler}
                >
                </FailedAuthPopup>
            :
                null
            }

        </>
    );

}

export default LoginContainer;

/*<Route
                path={path + "/afterAuth/:isAuth"}
                children={({ match }) => {
                    console.log("tu sam u auth successu");
                    console.log(match?.params);
                    if (!match) {
                        return null;
                    } else {
                        return match.params.isAuth;
                    }
                }}
            />
            */