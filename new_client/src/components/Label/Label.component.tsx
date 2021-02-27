import { LabelStyles, textAlign } from './Label.styles';
export {textAlign};



type LabelPropsType = {
    children: React.ReactNode[] | React.ReactNode
    text: string,
    htmlFor: string,
    textAlign?: textAlign
}

function Label({ text, textAlign, htmlFor }: LabelPropsType) {
    return (
        <LabelStyles
            htmlFor={htmlFor}
            textAlign={textAlign}
        >
            {text}
        </LabelStyles>
    );
}

export default Label;