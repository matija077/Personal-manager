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
    clickHandler
}: any) {

    return (
        <LoginStyles>
            <LoginInputStyles 
                type={inputType}
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