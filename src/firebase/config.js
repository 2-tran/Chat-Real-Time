import firebase from 'firebase';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: "AIzaSyAO4sGIQG30rYJCASKZsFds7iEEmXrz9ZI",
	authDomain: "chat-app-200ad.firebaseapp.com",
	projectId: "chat-app-200ad",
	storageBucket: "chat-app-200ad.appspot.com",
	messagingSenderId: "727380470653",
	appId: "1:727380470653:web:47253c8384fc96accd7a14",
	measurementId: "G-H0ZLW336QQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;