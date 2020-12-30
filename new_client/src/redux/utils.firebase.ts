import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB8bB1HJ2NPOSAKXwzKbruKyAPmK0iTOkY",
    authDomain: "personalapp-7f303.firebaseapp.com",
    projectId: "personalapp-7f303",
    storageBucket: "personalapp-7f303.appspot.com",
    messagingSenderId: "828360181199",
    appId: "1:828360181199:web:fb9fbf09dbb843a4a7beba"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});

function getCurrentUser(): Promise<firebase.User | null> {
    return new Promise(function(resolve, reject) {
        const unsubscribe = auth.onAuthStateChanged(
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}

function signOut() {
    auth.signOut();
}

function singInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
}

export {
    auth,
    googleProvider,
    signOut,
    singInWithGoogle,
    getCurrentUser
}