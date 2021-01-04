import {
    LoginStyles,
    LoginInputStyles,
    LoginPickerButton
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
            <LoginInputStyles
                type={inputType}
                value={value}
                onChange={valueChanged}
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