

 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: "AIzaSyDRAx0uqdvxFqbrcxDvCeYt1Z1EUsTFVE8",
   authDomain: "reminderapp-b689e.firebaseapp.com",
   projectId: "reminderapp-b689e",
   storageBucket: "reminderapp-b689e.firebasestorage.app",
   messagingSenderId: "544877244820",
   appId: "1:544877244820:web:bd1e52c24ecf7cfe365f81",
   measurementId: "G-ZY0WC3M9Z1"
 });

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
  const notificationTitle = payload.notification.title;
 const customSound = payload.data.sound;
 const sound = customSound || 'default';
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon, // 或指定一個圖示
    sound: sound
  };

  // 播放声音 (更可靠的方式是使用 Web Audio API 或 <audio>，并传入声音 URL)
  // 这里先尝试直接在通知选项设置
  if (customSound) {
    // 播放自定义音频 (需要确保音频文件可访问)
    // 建议使用 Web Audio API:
    const audio = new Audio(customSound);
    audio.play();
    // 或者在前端收到消息时处理
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
