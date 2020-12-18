import React from 'react';
import { connect } from 'react-redux';

// import {} from './header.styles';

import { getTestState, getUseless } from '../../redux/test-reducer/test-reducer.selectors';
import { changeTest } from '../../redux/test-reducer/test-reducer.actions';
import { RootState } from '../../redux/test-reducer/test-reducer.types';

interface Props {

}

function Header(props: Props) {

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
    changeTest: () => {}
}

var mapStateToProps = (state: RootState, ownProps: HeaderProps) => {
    return {
        testState: getTestState(state),
        exists: getUseless(state)
    }
};

var mapDispatchToProps = (dispatch: any, ownProps: HeaderProps) => {
    return {
        changeTestState: (text: string) => dispatch(changeTest(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);