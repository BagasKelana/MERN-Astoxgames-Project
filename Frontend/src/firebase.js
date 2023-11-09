// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_AUTH_KEY,
    authDomain: "astrogames-81537.firebaseapp.com",
    projectId: "astrogames-81537",
    storageBucket: "astrogames-81537.appspot.com",
    messagingSenderId: "952557285651",
    appId: "1:952557285651:web:18dc0d875c9acb1e1f6ae6",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

