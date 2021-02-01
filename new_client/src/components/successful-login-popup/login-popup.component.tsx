import PortalFactory from '../portalFactory/portalFactory';
import SuccessfullLoginPopup from './succesfull-login-popup.component';
import NonSuccessfullLoginPopup from './non-successfull-login-popup.component';

type LoginPoputType = {
    successfull: boolean,
    nextLocation: string
};

function LoginPopup({ successfull }: LoginPoputType) {
    console.log(successfull);
    const Render = successfull ? SuccessfullLoginPopup : NonSuccessfullLoginPopup;

    return (
        <PortalFactory>
            <Render></Render>
        </PortalFactory>
    );

}

export default LoginPopup;

function useLoginPopupWrapper() {

}