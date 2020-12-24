import {
    HeaderStyles,
    HeaderItemStyles
} from './header.styles';


function Header(props: any) {
    var userName = "";

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
            <HeaderItemStyles to="/Login">
                {
                    userName ?? "Login"
                }
            </HeaderItemStyles>
        </HeaderStyles>
    );
}

export default Header;