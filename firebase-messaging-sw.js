// Importar Firebase SDK para trabajar con mensajería en segundo plano
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-ltrpLcmUYFr-Hvz-DM29_WygLkp2U1w",
  authDomain: "tiendavirtual-d05b2.firebaseapp.com",
  projectId: "tiendavirtual-d05b2",
  storageBucket: "tiendavirtual-d05b2.appspot.com",
  messagingSenderId: "644882631561",
  appId: "1:644882631561:web:c715a4930e94d51266ef58",
  measurementId: "G-873NGWCNKD"
};

// Inicializar Firebase en el service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
