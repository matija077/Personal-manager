import {
    LoginStyles,
    LoginPickerLabelStyles,
    LoginPickerButton
} from './login.style';

function Login(props: any) {

    return (
        <LoginStyles>
            <LoginPickerLabelStyles>
                Choose login option:
            </LoginPickerLabelStyles>
            <LoginPickerButton
                data-id="google"         
            >
                Google
            </LoginPickerButton>  
            <LoginPickerButton
                data-id="standard"  
            >
                Email and Paswword
            </LoginPickerButton>        
        </LoginStyles>
    );
}

export default Login;