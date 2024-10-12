import addNotification from 'react-push-notification';

  export const PushNotification = (title:any,subtitle:any,Messages:any) => {
    console.log(Messages);
    const options:any = {
        title: `${title}`,
        subtitle: {subtitle},
        message: Messages,
        theme: 'red',
        native: true, // when using native, your OS will handle theming.
        duration: 5000, //optional, default: 5000,
        backgroundTop: 'green', //optional, background color of top container.
        backgroundBottom: 'darkgreen', //optional, background color of bottom container.
        colorTop: 'green', //optional, font color of top container.
        colorBottom: 'darkgreen', //optional, font color of bottom container.
        closeButton: 'Go away', //optional, text or html/jsx element for close text. Default: Close,
        icon: 'https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg', // Replace with your icon path
    };
    addNotification(options);
};
