import firebase from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBMDQUntBbY5PMTwLUTuWDYT0N59poheGU",
    authDomain: "shoppinglist-af6fe.firebaseapp.com",
    projectId: "shoppinglist-af6fe",
    storageBucket: "shoppinglist-af6fe.appspot.com",
    messagingSenderId: "1095087728307",
    appId: "1:1095087728307:web:4ef4dae073b5b31737b2c6"
};

firebase.initializeApp(config);


const googleProvider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

function login() {
    auth.signInWithPopup(googleProvider);
}

function logout() {
    auth.signOut();
}

export {
    login,
    logout,
    auth,
}