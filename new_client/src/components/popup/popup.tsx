import React from 'react'

import { PopupStyles } from './popup.styles';

type popupPropsType = {
    onClickHandler: (event: any) => void,
    children: [] | any
}

function Popup({ children, onClickHandler }: popupPropsType) {
    console.log(children);
    return (
        <PopupStyles
            onClick={onClickHandler}
        >
            {children}
        </PopupStyles>
    )
}

export default Popup;

/*<Children>

            </Children>*/
