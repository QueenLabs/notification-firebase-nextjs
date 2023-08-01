importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCR6AUtrvQ73neYTaopL03H8mCjOdalMWY",
  authDomain: "notification-next.firebaseapp.com",
  projectId: "notification-next",
  storageBucket: "notification-next.appspot.com",
  messagingSenderId: "509548497274",
  appId: "1:509548497274:web:716a47f7e06fa7a501eec3",
});


const messaging = firebase.messaging();

if (messaging) {
  messaging.onBackgroundMessage(function(payload) {
    //console.log('[firebase-messaging-sw.js] Received background message ', payload);
    console.log('[firebase-messaging-sw.js] PAYLOAD NOTIFICATION: ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.matchAll({ type: "window" }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          if (event.notification.data.route) client.href(event.notification.data.route);
          return client.focus();
        }
      }
      if (clients.openWindow)
        return clients.openWindow(event.notification.data.route || '/');
    }));
  });
}