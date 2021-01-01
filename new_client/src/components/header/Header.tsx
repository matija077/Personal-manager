import {
    HeaderStyles,
    HeaderItemStyles
} from './header.styles';

import { login } from '../../redux/utils';

export type HeaderProps = {
    testState:string,
    exists: unknown,
    userName: string,
    userNameLoginHandler: Function
};

function Header({
    testState,
    exist,
    userName="",
    userNameLoginHandler
}: any) {
    return(
        <HeaderStyles>
            <HeaderItemStyles to="/">
                Home
            </HeaderItemStyles>
            <HeaderItemStyles to="/summary">
                Summary
            </HeaderItemStyles>
            <HeaderItemStyles to="/Resource">
                Resource
            </HeaderItemStyles>
            <HeaderItemStyles to="/Clock">
                Clock
            </HeaderItemStyles>
            <HeaderItemStyles to="/Tasks">
                Tasks
            </HeaderItemStyles>
            <HeaderItemStyles to="/Chess">
                Chess
            </HeaderItemStyles>
            <HeaderItemStyles to="/Login" onClick={userNameLoginHandler}>
                {
                    userName || "Login"
                }
            </HeaderItemStyles>
        </HeaderStyles>
    );
}

export default Header;