import React from 'react'

import { PopupStyles } from './popup.styles';

type popupPropsType = {
    children: [] | any
}

function Popup({ children }: popupPropsType) {
    console.log(children);
    return (
        <PopupStyles>
            {children}
        </PopupStyles>
    )
}

export default Popup;

/*<Children>

            </Children>*/
