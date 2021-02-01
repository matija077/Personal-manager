import PortalFactory from '../portalFactory/portalFactory';
import SuccessfulLoginPopup from './succesful-login-popup.component';
import NonSuccessfulLoginPopup from './non-successful-login-popup.component';

type LoginPoputType = {
    successful: boolean,
    nextLocation: string
};

function LoginPopup({ successful }: LoginPoputType) {
    console.log(successful);
    const Render = successful ? SuccessfulLoginPopup : NonSuccessfulLoginPopup;

    return (
        <PortalFactory>
            <Render></Render>
        </PortalFactory>
    );

}

export default LoginPopup;

function useLoginPopupWrapper() {

}