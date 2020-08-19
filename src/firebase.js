import firebase from "firebase";

const Firebase = firebase.initializeApp({
  apiKey: "AIzaSyAyhkTeEAWR83SU-LBMUSyOY2SreuybV8M",
  authDomain: "notes-ish.firebaseapp.com",
  databaseURL: "https://notes-ish.firebaseio.com",
  projectId: "notes-ish",
  storageBucket: "notes-ish.appspot.com",
  messagingSenderId: "434336992858",
  appId: "1:434336992858:web:fbff0fe58c6c8734e71263",
  measurementId: "G-LBVT2Y2JBC"
});

const db = Firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
