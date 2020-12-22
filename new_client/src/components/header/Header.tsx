import {
    HeaderStyles,
    HeaderItemStyles
} from './header.styles';

function Header(props: any) {
    console.log(props);
    function handler(event: any) {
        console.log(event);
    }

    return(
        <HeaderStyles>
            <HeaderItemStyles as="section" to="/">
                Home
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/summary" onClick={handler}>
                Summary
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/Resource">
                Resource
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/Clock">
                Clock
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/Tasks">
                Tasks
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/Chess">
                Chess
            </HeaderItemStyles>
            <HeaderItemStyles as="section" to="/Login">
                Login
            </HeaderItemStyles>
        </HeaderStyles>
    );
}

export default Header;