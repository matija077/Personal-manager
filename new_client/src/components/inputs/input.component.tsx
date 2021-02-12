import { InputStyles,InputTypes } from './input.styles';
export { InputTypes };

/*enum InputTypes {
    text = "text",
    email = "email"
}*/



export type InputType = "text" | "email";

type InputPropsType = {
    children: React.ReactNode[] | React.ReactNode,
    id?: string,
    type: InputType,
    onFocused: (event: any) => void,
    onPointerLeave: (event: any) => void,
    onInputHandler: (event: any) => void
}

function Input({ children, id, type, onFocused, onPointerLeave, onInputHandler } : InputPropsType) {
    return (
        <InputStyles
            id={id}
            type={type}
            onFocus={onFocused}
            onPointerLeave={onPointerLeave}
            onInput={onInputHandler}
        >
            {children}
        </InputStyles>
    );
}

export default Input;