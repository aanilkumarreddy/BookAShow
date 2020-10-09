importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'XXXXXXXXXXXXXXXXX',
  authDomain: 'XXXXXX',
  databaseURL: 'XXXXXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXXXXX',
  messagingSenderId: 'XXXXXXX',
  appId: 'XXXXXXXXXXXXXXXXXX',
  measurementId: 'XXXXXXXXXX',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
