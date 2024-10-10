// self.addEventListener('push', (event) => {
//   const data: NotificationData = event.data.json();
//   const title = data.title;
//   const text = data.text;
//   const imageUrl = data.imageUrl;

//   self.registration.showNotification(title, {
//     body: text,
//     icon: imageUrl,
//     image: imageUrl,
//     requireInteraction: true,
//   });
// });