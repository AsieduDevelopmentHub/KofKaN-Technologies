//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3DRcXaAfxadmKEejs3vyynvpxErzFtLY",
  authDomain: "kofkantechnologies.firebaseapp.com",
  projectId: "kofkantechnologies",
  storageBucket: "kofkantechnologies.firebasestorage.app",
  messagingSenderId: "651853937548",
  appId: "1:651853937548:web:e62fcf94c9548597e674a9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();