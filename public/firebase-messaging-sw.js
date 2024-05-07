importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDbap0Y7GxEiwMuXoIIY9cSWMc25xDOB7U",
  authDomain: "homeshapers-57b05.firebaseapp.com",
  projectId: "homeshapers-57b05",
  storageBucket: "homeshapers-57b05.appspot.com",
  messagingSenderId: "992871645013",
  appId: "1:992871645013:web:de7f7a5eac38b0f2d0b9dc",
  measurementId: "G-3KXSSSD5KS",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
