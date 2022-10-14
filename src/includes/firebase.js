import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBstKHDwfbJth0JuT6M9XfDe3xbR7jc5qE",
    authDomain: "musicplayer-bc419.firebaseapp.com",
    projectId: "musicplayer-bc419",
    storageBucket: "musicplayer-bc419.appspot.com",
    messagingSenderId: "367484787609",
    appId: "1:367484787609:web:6457c951fe691293fb5108"
  };


firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')

export { auth, db, usersCollection, storage, songsCollection }