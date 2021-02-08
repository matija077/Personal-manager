import { InputStyles } from './InputText.styles';

type InputTextPropsType = {
    children: any[]
}

function InputText(props: InputTextPropsType) {
    return (
        <InputStyles>
            {props.children}
        </InputStyles>
    );
}

export default InputText;