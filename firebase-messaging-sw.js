
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

firebase.initializeApp(firebaseConfig);


// Add 'notificationclick' event handler before firebase.messaging() call
self.addEventListener('notificationclick', function (e) {
    console.log('SW notification click event', e);
    console.log('urlToOpen: ', e.notification.data.FCM_MSG.data.urlToOpen);
    e.notification.close();
    const title = e.notification.title;
    const image = e.notification.image; //image is optional
    const redirectUrl = "redirect?title=" + title + "&image=" + image; //image could be "undefined"
    
    e.waitUntil(clients.openWindow(redirectUrl));

    // e.waitUntil(clients.openWindow(e.notification.data.FCM_MSG.data.urlToOpen));

    // This is still openeing link in browser. 
    // e.waitUntil(clients.openWindow("intent://8xn9iq3lG_w/#Intent;scheme=vnd.youtube;package=com.google.android.youtube;S.browser_fallback_url=https://www.youtube.com/watch?v=w_f0vwZcRMw;end;"));

    // This works but <a> tag is not possible in service worker file.
    // <a href="intent://8xn9iq3lG_w/#Intent;scheme=vnd.youtube;package=com.google.android.youtube;S.browser_fallback_url=https://www.youtube.com/watch?v=w_f0vwZcRMw;end;">youtube or market</a>
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically (i.e. if 'nofification' key is used in payload)
// and you should use 'data' messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png',
    //   data: {urlToOpen: payload.data.urlToOpen}
    // };

    // // Show notification manually
    // self.registration.showNotification(notificationTitle, notificationOptions);

});