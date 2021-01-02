import {
    LoginStyles,
    LoginPickerLabelStyles,
    LoginPickerButton
} from './login.style';

type LoginPropsType = {
    clickHandler: Function
}

function Login({ clickHandler }: any) {

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