import {
    LoginStyles,
    LoginInputStyles,
    LoginPickerButton,
    LoginEmailAndPasswordLabelStyles
} from './login.style';

type loginEmailAndPasswordPropsTypes = {
    inputType: String | undefined,
    clickHandler: Function
}

function loginEmailAndPassword({
    inputType,
    clickHandler,
    value,
    valueChanged,
    inputRef,
    valid
}: any) {

    return (
        <LoginStyles>
            <LoginEmailAndPasswordLabelStyles
                htmlFor="input"
            >
                {
                    inputType==="Email" ? "Write your email" : "Write your password"
                }
            </LoginEmailAndPasswordLabelStyles>
            <LoginInputStyles
                ref={inputRef}
                type={inputType}
                value={value}
                valid={valid}
                onChange={valueChanged}
                id="input"
                placeholder={inputType==="Email" ? "Email here" : "Password"}
                autoComplete={inputType==="Email" ? "email" : "current-password"}
                title={inputType==="Email" ? "your email goes here": "your password goes here"}
                autoFocus={true}
                pattern={inputType==="Email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" : undefined}
                minLength={inputType==="Email" ? undefined : 4}
            >
            </LoginInputStyles>
            <LoginPickerButton
                onClick={clickHandler}
            >
                Proceed
            </LoginPickerButton>
        </LoginStyles>
    );
}

export default loginEmailAndPassword;