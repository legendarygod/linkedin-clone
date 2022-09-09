// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkdHqOTU6Fhv3QTSOFobsdp9UySKfvzyA",
  authDomain: "linkedin-clone-be20b.firebaseapp.com",
  projectId: "linkedin-clone-be20b",
  storageBucket: "linkedin-clone-be20b.appspot.com",
  messagingSenderId: "1012541591618",
  appId: "1:1012541591618:web:f97342f6eba2b5c25f9ddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app)

export { auth, provider, storage}
export default db;