import { LabelStyles } from './Label.styles';

type LabelPropsType = {
    children: React.ReactNode[] | React.ReactNode
    text: String
}

function Label({ text, children }: LabelPropsType) {
    return (
        <LabelStyles>
            {text}
            {children}
        </LabelStyles>
    );
}

export default Label;