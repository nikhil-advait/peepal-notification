/* // Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging(); */

/*
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
*/
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 //https://support.google.com/firebase/answer/7015592#zippy=%2Cin-this-article

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrdpBDDUPrfTuWcg49do7rtKHnoT3nzyQ",
  authDomain: "trial-web-push-firebase.firebaseapp.com",
  projectId: "trial-web-push-firebase",
  storageBucket: "trial-web-push-firebase.appspot.com",
  messagingSenderId: "55513369041",
  appId: "1:55513369041:web:c22e564480032fcbf9f8f0",
  measurementId: "G-M67JMQPDLD"
};

firebase.initializeApp(firebaseConfig)

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
