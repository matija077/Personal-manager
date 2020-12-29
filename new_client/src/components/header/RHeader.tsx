import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { getTestState, getUseless } from '../../redux/test-reducer/test-reducer.selectors';
import { changeTest } from '../../redux/test-reducer/test-reducer.actions';
import { TestState } from '../../redux/test-reducer/test-reducer.types';
import { DispatchType } from '../../redux/store';
import { RootState } from '../../redux/root-reducer';
import Header from './Header';
import { login } from '../../redux/utils';

type Props = {

}



function HeaderContainer(props: any) {
    var testState = useSelector(getTestState);
    var exists = useSelector(getUseless);
    var dispatch = useDispatch();
    function changeTest(text: string) {
        dispatch(changeTest(text));
    }
    var [userName, setUserName] = useState("");

    function userNameLoginHandler(event: React.SyntheticEvent<typeof Header>) {
        if (userName) {
            console.log("userprofile");
        } else {
            login();
        }
    }


    return (
        <Header
            testState={testState}
            exist={exists}
            userName={userName}
            userNameLoginHandler={userNameLoginHandler}
        >
        </Header>
    );
}

type HeaderContainerState = {
    testState: string
}

type HeaderContainerProps = {
    changeTest: () => void
}

var mapStateToProps = (state: RootState, ownProps: HeaderContainerProps) => {
    return {
        testState: getTestState(state),
        exists: getUseless(state)
    }
};

var mapDispatchToProps = (dispatch: DispatchType, ownProps: HeaderContainerProps) => {
    return {
        changeTestState: (text: string):any => dispatch(changeTest(text)),
    }
};

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;