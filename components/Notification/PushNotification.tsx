// import React, { useState, useEffect } from 'react';
// import PushNotifications from 'react-push-notifications';

// interface NotificationData {
//   title: string;
//   text: string;
//   imageUrl: string;
// }

// function App() {
//   const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

//   useEffect(() => {
//     const register = async () => {
//       try {
//         const reg = await navigator.serviceWorker.register('/service-worker.js');
//         setRegistration(reg);
//       } catch (error) {
//         console.error('Error registering service worker:', error);
//       }
//     };

//     register();
//   }, []);

//   const handleNotification = (notification: NotificationData) => {
//     console.log('Received notification:', notification);
//   };

//   return (
//     <div>
//       <PushNotifications
//         registration={registration}
//         onNotification={handleNotification}
//       />
//     </div>
//   );
// }