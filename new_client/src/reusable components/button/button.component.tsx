import Box from '../box/box.component';

import { ButtonStyles } from './button.styles';

function Button() {
    const border = {
        width: "200px",
        style: "dotted",
        color: "green"
    }

    return (
        <ButtonStyles
            as="button"
            width="400"
            border={border}
        >
            BUTTON
        </ButtonStyles>
    );

}

export default Button;
