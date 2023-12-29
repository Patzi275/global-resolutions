import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6k9TcDNQytT0OmAZdhEpAL8L3SNppC0A",
  authDomain: "nyr-2024.firebaseapp.com",
  projectId: "nyr-2024",
  storageBucket: "nyr-2024.appspot.com",
  messagingSenderId: "887372010736",
  appId: "1:887372010736:web:7b24fcbde60e8ed89ede35"
};

const authApp = initializeApp(firebaseConfig, 'auth');
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)
const userCreationAuth = getAuth(authApp);

export {db, auth, userCreationAuth, onAuthStateChanged};