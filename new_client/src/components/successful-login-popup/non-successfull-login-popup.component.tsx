import React,  { MutableRefObject, useEffect } from 'react';
import { NonSuccessfulLoginPopupStyles, NonSuccessfulLoginPopupTextStyles } from './non-successful-login-popup.styles';

type NonSuccessfulLoginPopupType = {
    onTransitionedHandler: (event: any) => void,
    popupRef: MutableRefObject<any>
    children: []
};

function NonSuccessfulLoginPopup({ onTransitionedHandler, popupRef: ref }: NonSuccessfulLoginPopupType) {
    useEffect(() => {
        console.log("mounter popup");

    }, [])
    console.log("code parsed popup");

    return (
       <NonSuccessfulLoginPopupStyles
            onTransitionEndCapture={onTransitionedHandler}
            ref={ref}
            onClick={(event) => {console.log("working")}}
       >
           <NonSuccessfulLoginPopupTextStyles>
                PASSWORD OR EMAIL IS WRONG
           </NonSuccessfulLoginPopupTextStyles>
        </NonSuccessfulLoginPopupStyles>
    );

}

export default React.forwardRef(NonSuccessfulLoginPopup);