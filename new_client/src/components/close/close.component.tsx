type ClosePropsType = {
    onClickHandler: (event: any) => void,
    children: never[]
}

function Close({ onClickHandler }: ClosePropsType) {

    return (
        <p
            onClick={onClickHandler}
            style={{ border: `2px black` }}
        >
            CLOSE
        </p>
    );
}

export default Close;