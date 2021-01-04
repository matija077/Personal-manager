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
    valueChanged
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
                type={inputType}
                value={value}
                onChange={valueChanged}
                id="input"
                placeholder={inputType==="Email" ? "Email here" : "Password"}
                autoComplete={inputType==="Email" ? "email" : "current-password"}
                title={inputType==="Email" ? "your email goes here": "your password goes here"}
                autoFocus={true}
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