import { ContainerStyles } from './HalfSizedContainer.styles';

type HalfSizedContainerPropsType = {
    children: React.ReactNode[] | React.ReactNode
}

function HalfSizedContainer(props: HalfSizedContainerPropsType) {
    return (
        <ContainerStyles>
            {props.children}
        </ContainerStyles>
    );
}

export default HalfSizedContainer;