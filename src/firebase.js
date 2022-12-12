// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore"
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

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0){
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoURL: user.photoURL,
        town: "",
        city: "",
        bio: "",
        followers: [],
        following: [],
      });
    }
  } catch (err){
    console.error(err);
    alert(err.message)
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      photoURL: "/images/user.svg",
      town: "",
      city: "",
      bio: "",
      followers: [],
      following: [],
    });
    
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
} 

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!")
  } catch (error) {
    console.error(error);
    alert(error.message)
  }
};

const logout = () => {
  signOut(auth);
}

export { auth, provider, storage, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout}
export default db;