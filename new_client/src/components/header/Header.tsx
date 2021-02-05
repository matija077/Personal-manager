import {
    HeaderStyles,
    HeaderItemStyles,
    HeaderItemContainerStyles,
    HeaderContainerItemStyles
} from './header.styles';

export type HeaderProps = {
    testState:string,
    exists: unknown,
    userName: string,
    userNameOnClickHandler: Function,
    logout: Function
};

function Header({
    testState,
    exist,
    userName="",
    userNameOnClickHandler,
    logout
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
            {userName ?
                <HeaderItemContainerStyles>
                    <HeaderContainerItemStyles to="#" onClick={userNameOnClickHandler}>
                        {
                            userName
                        }
                    </HeaderContainerItemStyles>
                    /
                    <HeaderContainerItemStyles to="/" onClick={logout}>
                        Sign out
                    </HeaderContainerItemStyles>
                </HeaderItemContainerStyles>
            :
                <HeaderItemStyles to="/Login">
                    {
                        "Login"
                    }
                </HeaderItemStyles>
            }
        </HeaderStyles>
    );
}

export default Header;