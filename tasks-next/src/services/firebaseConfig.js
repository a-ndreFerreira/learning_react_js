
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "tasks-plus-888de.firebaseapp.com",
    projectId: "tasks-plus-888de",
    storageBucket: "tasks-plus-888de.firebasestorage.app",
    messagingSenderId: "826417304632",
    appId: "1:826417304632:web:b9556f81640918f811c2cd"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };