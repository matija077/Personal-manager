import React,  { MutableRefObject, useEffect, useRef } from 'react';
import { AnyIfEmpty } from 'react-redux';
import { NonSuccessfulLoginPopupStyles, NonSuccessfulLoginPopupTextStyles } from './non-successful-login-popup.styles';

type NonSuccessfulLoginPopupType = {
    onTransitionedHandler: (event: any) => void,
    children: []
};

function NonSuccessfulLoginPopup({ onTransitionedHandler }: NonSuccessfulLoginPopupType) {
    useEffect(() => {
        console.log("mounter popup");

    }, [])
    console.log("code parsed popup");


    return (
       <NonSuccessfulLoginPopupStyles
            onAnimationEnd={onTransitionedHandler}
       >
           <NonSuccessfulLoginPopupTextStyles>
                PASSWORD OR EMAIL IS WRONG
           </NonSuccessfulLoginPopupTextStyles>
        </NonSuccessfulLoginPopupStyles>
    );

}

export default NonSuccessfulLoginPopup;