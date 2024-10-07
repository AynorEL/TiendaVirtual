// Importar las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Tu configuración de Firebase (debes actualizarla con tus claves reales)
const firebaseConfig = {
  apiKey: "AIzaSyC-ltrpLcmUYFr-Hvz-DM29_WygLkp2U1w",
  authDomain: "tiendavirtual-d05b2.firebaseapp.com",
  projectId: "tiendavirtual-d05b2",
  storageBucket: "tiendavirtual-d05b2.appspot.com",
  messagingSenderId: "644882631561",
  appId: "1:644882631561:web:c715a4930e94d51266ef58",
  measurementId: "G-873NGWCNKD"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firebase Cloud Messaging (FCM)
const messaging = getMessaging(app);

// Obtener el token para recibir notificaciones push
getToken(messaging, { vapidKey: 'TU_PUBLICA_VAPID_KEY' }).then((currentToken) => {
  if (currentToken) {
    console.log('Token recibido:', currentToken);
    // Aquí puedes enviar el token a tu servidor si es necesario
  } else {
    console.log('No se pudo obtener el token de notificaciones.');
  }
}).catch((err) => {
  console.log('Ocurrió un error al obtener el token.', err);
});

// Manejar mensajes cuando la página está en primer plano
onMessage(messaging, (payload) => {
  console.log('Mensaje recibido:', payload);
  // Mostrar notificación o realizar alguna acción con el mensaje
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});
