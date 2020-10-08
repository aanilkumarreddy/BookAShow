importScripts("https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyCLNmlD-uHlsqCLSIkFDqq7CaoEtefnDWY",
  authDomain: "book-a-show.firebaseapp.com",
  databaseURL: "https://book-a-show.firebaseio.com",
  projectId: "book-a-show",
  storageBucket: "book-a-show.appspot.com",
  messagingSenderId: "974490480766",
  appId: "1:974490480766:web:e29e72300c6712f458282f",
  measurementId: "G-JFDD8YLD2B",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
