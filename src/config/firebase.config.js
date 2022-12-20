import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVd46HZ8wsm5uCvLdqjFetQbG_ZcL0MOY",
  authDomain: "mezbaan0.firebaseapp.com",
  projectId: "mezbaan0",
  storageBucket: "mezbaan0.appspot.com",
  messagingSenderId: "421877650594",
  appId: "1:421877650594:web:5c2ec6fbd9dc95cb3d33fb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); //enable google-signin pop-up
provider.setCustomParameters({ promt: "selected_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
