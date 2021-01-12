import { CloseStyles, PositionType } from './close.styles';

type ClosePropsType = {
    onClickHandler: (event: any) => void,
    position?: PositionType
    children: never[]
}

function Close({ onClickHandler, position }: ClosePropsType) {

    return (
        <CloseStyles
            onClick={onClickHandler}
            position={position}
        >
        </CloseStyles>
    );
}

export default Close;