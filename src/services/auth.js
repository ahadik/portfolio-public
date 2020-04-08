import * as firebase from "firebase/app";
import app from "firebase/app"
import "firebase/auth";

export const isBrowser = () => typeof window !== "undefined";

let currentUser = {};

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID
};

console.log(firebase);

if (isBrowser()) {
  app.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('HELLO', user);
      currentUser = user;
    } else {
      currentUser = {};
    }
  });
}

export const handleLogin = (password, onSuccess, onFailure) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebase.auth().signInWithEmailAndPassword('alex@alexhadik.com', password);
  })
  .then((userInfo) => {
    onSuccess(userInfo);
  })
  .catch(function(error) {
    // Handle Errors here.
    onFailure(error);
  });
    
  return false
}

export const isAuthenticated = () => {
  console.log('authenticated: ', !!currentUser.uid);
  return !!currentUser.uid;
};

export const logout = (onSuccess, onFailure) => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebase.auth().signOut();
  })
  .then(() => {
    onSuccess();

  })
  .catch(function(error) {
    // Handle Errors here.
    onFailure(error);
  });
}
