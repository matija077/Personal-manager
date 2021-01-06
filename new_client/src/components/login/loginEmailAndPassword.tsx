import React from 'react';

import {
    LoginStyles,
    LoginInputStyles,
    LoginPickerButton,
    LoginEmailAndPasswordLabelStyles
} from './login.style';

type loginEmailAndPasswordPropsTypes = {
    inputType: String | undefined,
    clickHandler: Function
}

function loginEmailAndPassword({
    inputType,
    clickHandler,
    value,
    valueChanged,
    inputRef,
    valid,
    pointerLeaveHandler
}: any) {
    const TEXT = "text";

    return (
        <LoginStyles>
            <LoginEmailAndPasswordLabelStyles
                htmlFor="input"
            >
                {
                    inputType===TEXT ? "Write your email" : "Write your password"
                }
            </LoginEmailAndPasswordLabelStyles>
            <LoginInputStyles
                ref={inputRef}
                type={inputType}
                className={valid ? undefined : "invalid"}
                value={value}
                onChange={valueChanged}
                id="input"
                placeholder={inputType===TEXT ? "ana.ana@gmail.com" : "Password"}
                autoComplete={inputType===TEXT ? "email" : "current-password"}
                title={inputType===TEXT ? "Please provide correct email": "use more then 4 characters"}
                autoFocus={true}
                minLength={inputType===TEXT ? undefined : 4}
                onPointerOut={pointerLeaveHandler}
            >
            </LoginInputStyles>
            <LoginPickerButton
                onClick={clickHandler}
            >
                Proceed
            </LoginPickerButton>
        </LoginStyles>
    );
}

export default React.memo(loginEmailAndPassword);