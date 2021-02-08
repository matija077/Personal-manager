import { InputStyles } from './InputEmail.styles';

type InputEmailPropsType = {
    children: any[]
}

function InputEmail(props: InputEmailPropsType) {
    return (
        <InputStyles>
            {props.children}
        </InputStyles>
    );
}

export default InputEmail;