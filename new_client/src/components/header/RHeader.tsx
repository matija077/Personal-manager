import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';

import { getTestState, getUseless } from '../../redux/test-reducer/test-reducer.selectors';
import { getUser, getExpiresIn } from '../../redux/user-reducer/user.selectors';
import { logout as logoutRedux } from '../../redux/user-reducer/user.actions';
import Header from './Header';
import { usePersistedStorage } from '../../utility/hooks/customHooks.utils';
import { useSilentRefresh, useInitialSilentRefresh } from "../../utility/hooks/customAuthHooks";
import { getCurrentUser, signOut, FirebaseUserType,  getToken} from '../../redux/utils.firebase';
import { logout as axiosLogout } from "../../utility/hooks/customAuthHooks";

type Props = {

}

type userType = {
    userName:  string | null | undefined,
    email: string| undefined | null,
    password: string | null,
    token: string | null
};

var initialUser: userType =  {
    userName: null,
    email: null,
    password: null,
    token: null
}

function HeaderContainer(props: any) {
    var testState = useSelector(getTestState);
    var exists = useSelector(getUseless);
    var dispatch = useDispatch();
    var reduxUser = useSelector(getUser, shallowEqual);
    const expiresIn = parseInt(useSelector(getExpiresIn));
    //const [user, setUserObject] = useState<userType>({} as userType);

    useLayoutEffect(() => {
        setUserObject({
            ...initialUser,
            userName: reduxUser.nickname,
            email: reduxUser.email
        });
    }, [reduxUser])

    /**
     * we want user to be saved to persistenStorage.
     * whenever we chaneg osmethgi nto the user object we want
     * to query firebase user to see if there are some changes there
     * if name is different then udpate our user.
     */

     var [user, setUserObject] =
        usePersistedStorage<userType>("user", initialUser, [], [], sessionStorage) ;
    let {userName = "", email = "", password = ""} = user;

    useSilentRefresh(expiresIn, dispatch);
    useInitialSilentRefresh(dispatch);

    /**
     * wrapper for setting new user using useState hooks setState function
     * also it cheks for new token on each change of the user
     * becdause promises and hooks dont go very well together
     * we just change the user.token direclty witthout changing an actual user data.
     * @param userData<FirebaseUserType>
     */
    function setUserObjectHOC(userData: FirebaseUserType ) {
        console.log("HOC");
        console.log(`dsiaplyBNamne ${userData?.displayName} = userNmae ${user.userName}`);
        userData?.getIdToken(true).then(
            function resolved(result) {
                console.log(result);
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

    /**
     * HOF that checks for same user names.
     * @param userData<FirebaseUserType>
     */
    function setUserObjectMemo(userData: FirebaseUserType) {
        //console.log("memo");
        //console.log(`dsiaplyBNamne ${userData?.displayName} = userNmae ${user.userName}`);
        if (userData?.displayName !== user.userName) {
            console.log("different");
            setUserObjectHOC(userData);
        }
    }

    function queryUser() {
        // console.log("entering");
        getCurrentUser().then(function(resolved) {
            getToken((result) => {console.log(result)});
            setUserObjectMemo(resolved);
        });
    }

    function userNameOnClickHandler(event: React.SyntheticEvent<typeof Header>) {
        if (userName) {
            console.log("user profile");
        } else {
            /*login(email, password).
            //singInWithGoogle().
            then(function resolved(result: any) {
                console.log(result);
                setUserObjectMemo(result.user.displayName);
            }).
            catch(function rejected(error: PromiseRejectedResult) {
                console.log("error while login in");
                console.log(error);
            });*/
        }
    }

    function logout(event: React.SyntheticEvent<typeof Header>) {
        dispatch(logoutRedux());
        axiosLogout();
    }

    useEffect(() => {
        if (!user.token) {
            return;
        }

        axios.post("http://localhost:5012/api/verifyToken", {
            token: user.token,
            email: user.email
        }).then(function resolved(result) {
            console.log(result);
        }).catch(function rejected(error) {
            console.log("errow writing to backend");
            console.log(error);
        });
    },
        [user.token, user.email]
    )

    /**
    * sign out on unmount
     */
    useEffect(() => {
        return function cleanup() {
            signOut();
        }
    }, [])

    return (
        <Header
            testState={testState}
            exist={exists}
            userName={userName}
            userNameOnClickHandler={userNameOnClickHandler}
            logout={logout}
        >
        </Header>
    );
}

/*type HeaderContainerState = {
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
};*/

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;