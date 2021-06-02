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