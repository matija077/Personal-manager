import { EnumType } from 'typescript';
import {
    LoginStyles,
    LoginPickerLabelStyles,
    LoginPickerButton,
    LoginInputStyles
} from './login.style';

type LoginPropsType = {
    clickHandler: Function
}

function Login({ clickHandler, state }: any) {

    return (
        <LoginStyles>
            <LoginPickerLabelStyles>
                Choose login option:
            </LoginPickerLabelStyles>
            <LoginPickerButton
                data-id="google"
                onClick={clickHandler}         
            >
                Google
            </LoginPickerButton>  
            <LoginPickerButton
                data-id="standard"
                onClick={clickHandler}    
            >
                Email and Paswword
            </LoginPickerButton>      
        </LoginStyles>
    );
}

export default Login;