import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    initializeApp({
      apiKey: "AIzaSyCR6AUtrvQ73neYTaopL03H8mCjOdalMWY",
      authDomain: "notification-next.firebaseapp.com",
      projectId: "notification-next",
      storageBucket: "notification-next.appspot.com",
      messagingSenderId: "509548497274",
      appId: "1:509548497274:web:716a47f7e06fa7a501eec3",
    });

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        console.log("CURRENT TOKEN", await this.tokenInlocalforage())
      }
      await Notification.requestPermission();
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey:
          "BGpPQroa0qKkxtTHpOoZpmUOgBEDt5Va0zMcc--Bdc4opdo9udANARw7m8n_nmzOqu7VOPBKP4Vz3u3l3cCeDMQ",
      });
      localforage.setItem("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };