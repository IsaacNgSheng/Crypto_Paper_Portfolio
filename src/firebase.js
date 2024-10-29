import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { VUE_APP_FIREBASE_API_KEY } from '../config.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VUE_APP_FIREBASE_API_KEY,
    authDomain: "democpp-bd703.firebaseapp.com",
    projectId: "democpp-bd703",
    storageBucket: "democpp-bd703.appspot.com",
    messagingSenderId: "1021635057897",
    appId: "1:1021635057897:web:5a42b0c3094398c6213878",
    measurementId: "G-CC8BQZH46Q"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
