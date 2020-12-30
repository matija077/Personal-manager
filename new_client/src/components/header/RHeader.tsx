import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getTestState, getUseless } from '../../redux/test-reducer/test-reducer.selectors';
import { changeTest } from '../../redux/test-reducer/test-reducer.actions';
import { TestState } from '../../redux/test-reducer/test-reducer.types';
import { DispatchType } from '../../redux/store';
import { RootState } from '../../redux/root-reducer';
import Header from './Header';
import { login, usePersistedStorage } from '../../redux/utils';
import { getCurrentUser, signOut, singInWithGoogle, FirebaseUserType } from '../../redux/utils.firebase';

type Props = {

}

type userType = {
    userName:  string | null,
    email: string,
    password: string,
    token: string | null
};

var initialUser: userType =  {
    userName: null,
    email: "matija.prs@gmail.com",
    password: "123456",
    token: null
}

function HeaderContainer(props: any) {
    var testState = useSelector(getTestState);
    var exists = useSelector(getUseless);
    var dispatch = useDispatch();
    function changeTest(text: string) {
        dispatch(changeTest(text));
    }
    var [user, setUserObject] =
        usePersistedStorage("user", initialUser) as [userType, Function];
    let {userName = "", email = "", password = ""} = user;

    function setUserObjectHOC(userData: FirebaseUserType ) {
        console.log("HOC");
        console.log(`dsiaplyBNamne ${userData?.displayName} = userNmae ${user.userName}`);
        userData?.getIdToken(true).then(
            function resolved(result) {
                user.token = result;
            },
            function rejected(error) {
                console.log("error getting token");
                console.log(error);
            }
        );

        setUserObject({
            ...user,
            userName: userData?.displayName,
            email: userData?.email,
        })
    }

    function setUserObjectMemo(userData: FirebaseUserType) {
        console.log("memo");
        console.log(`dsiaplyBNamne ${userData?.displayName} = userNmae ${user.userName}`);
        if (userData?.displayName !== user.userName) {
            console.log("different");
            setUserObjectHOC(userData);
        }
    }

    useEffect(() => {
        console.log("entering");
        getCurrentUser().then(function(resolved) {
            setUserObjectMemo(resolved)
            return () => {
                console.log("leaving");
                signOut();
            }
        });
    }, [user])

    function userNameLoginHandler(event: React.SyntheticEvent<typeof Header>) {
        if (userName) {
            console.log("user profile");
        } else {
            login(email, password).
            //singInWithGoogle().
            then(function resolved(result: any) {
                console.log(result);
                setUserObjectMemo(result.user.displayName);
            }).
            catch(function rejected(error: PromiseRejectedResult) {
                console.log("error while login in");
                console.log(error);
            });
        }
    }

    useEffect(() => {
        axios.post("/api/verifyToken", {
            token: user.token,
            email: user.email
        }).
        then(function resolved(result) {
            console.log(result);
        }).
        catch(function rejected(error) {
            console.log("errow writing to backend");
            console.log(error);
        });
    },
        [user.token]
    )

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