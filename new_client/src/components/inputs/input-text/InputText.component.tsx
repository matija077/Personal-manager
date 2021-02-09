import { InputStyles } from './InputText.styles';

type InputTextPropsType = {
    children: React.ReactNode[] | React.ReactNode,
    id: string
}

function InputText({ children, id }: InputTextPropsType) {
    return (
        <InputStyles
            id={id}
        >
            {children}
        </InputStyles>
    );
}

export default InputText;