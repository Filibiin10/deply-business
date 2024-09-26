// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-3DOmiy0kL1S3ejReOJRsjsJNhIEV3ko",
  authDomain: "mybusiness-directory.firebaseapp.com",
  projectId: "mybusiness-directory",
  storageBucket: "mybusiness-directory.appspot.com",
  messagingSenderId: "900277703942",
  appId: "1:900277703942:web:71892598e87156de4afa87",
  measurementId: "G-04GT0FV392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)

// const analytics = getAnalytics(app);