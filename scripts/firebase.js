//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiGG34jrpMqMbjs1ObSfFd4Ix_4iRLKtU",
  authDomain: "kofkantechnology.firebaseapp.com",
  projectId: "kofkantechnology",
  storageBucket: "kofkantechnology.firebasestorage.app",
  messagingSenderId: "1063516586033",
  appId: "1:1063516586033:web:8f95331387b4dafee31510",
  measurementId: "G-6YJLR3646X"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();