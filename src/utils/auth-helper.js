/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import registrationToken from './registration-token-helper'

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    registrationToken.getToken().then((token) => {
      alert(token)
    }).catch((err) => {
      console.log(err)
    })
  } else {
    console.log('User is signed out')
  }
});

const AuthHelper = {
  signIn({email, password}) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(error);
      });    
  },
  signOut(){
    signOut(auth).catch((error) => {
      console.log(error)
    });
  }
}

export default AuthHelper