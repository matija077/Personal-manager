import React, { useState } from 'react';
import { connect, useDispatch, useSelector, useStore } from 'react-redux';

// import {} from './header.styles';

import { getTestState, getUseless } from '../../redux/test-reducer/test-reducer.selectors';
import { changeTest } from '../../redux/test-reducer/test-reducer.actions';
import { TestState } from '../../redux/test-reducer/test-reducer.types';
import { DispatchType } from '../../redux/store';
import { RootState } from '../../redux/root-reducer';

interface Props {

}

function Header(props: any) {
    var testState = useSelector(getTestState);
    var exists = useSelector(getUseless);
    var dispatch = useDispatch();
    function changeTest(text: string) {
        dispatch(changeTest(text));
    }
    console.log(testState);
    console.log(exists);


    return (
        <div>
            <div>
                "header component"
            </div>
            {
               testState
            }
            {
                exists
            }
        </div>
    );

}

interface HeaderState {
    testState: string
}

interface HeaderProps {
    changeTest: () => void
}

var mapStateToProps = (state: RootState, ownProps: HeaderProps) => {
    return {
        testState: getTestState(state),
        exists: getUseless(state)
    }
};

var mapDispatchToProps = (dispatch: DispatchType, ownProps: HeaderProps) => {
    return {
        changeTestState: (text: string):any => dispatch(changeTest(text)),
    }
};

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;