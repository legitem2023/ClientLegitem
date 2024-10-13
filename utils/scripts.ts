import { encode } from "js-base64";
import { useCallback } from "react";
import { setGlobalState } from "state";


export const setSharedCookie = (name: string, value: string, daysToExpire: any) => {
  // Get the existing cookie
  const existingCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${encodeURIComponent(name)}=`));

  // Parse the existing cookie value if it exists, otherwise start with an empty array
  const usersArray = existingCookie
      ? JSON.parse(decodeURIComponent(existingCookie.split('=')[1]))
      : [];

  // Add the new value (user) to the array
  usersArray.push(value);

  // Set expiration date
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + daysToExpire);

  // Save the updated array back to the cookie
  const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(usersArray)) +
      '; expires=' + expiration.toUTCString() +
      '; secure;' +
      '; path=/';
  document.cookie = cookieValue;
};
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
export const filterAndSumQuantity = (jsonData:any) =>{
  const uniqueEntries = [];
  const sumMap = new Map();
  console.log()
  if(jsonData[0] === undefined) return
  jsonData.forEach((item:any) => {
    const productCode = item.productCode;
    const quantity = item.Quantity;
    const existingEntry = uniqueEntries.find(entry => entry.productCode === productCode);  
    if (existingEntry) {
      existingEntry.Quantity += quantity || 0;
    } else {
      const uniqueEntry = {
        productCode,
        Thumbnail: item.Thumbnail,
        Name: item.Name,
        Price: item.Price,
        Size: item.Size,
        Color: item.Color,
        Quantity: quantity || 0,
        agentEmail:item.agentEmail
      };
      uniqueEntries.push(uniqueEntry);
    }
    const currentSum = sumMap.get(productCode) || 0;
    sumMap.set(productCode, currentSum + (quantity || 0));
  });

  return uniqueEntries;
}

export const generateTrackingNumber = () =>{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let trackingNumber = '';
  for (let i = 0; i < 12; i++) {
      trackingNumber += "TRK-"+chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return trackingNumber;
}

export const generateOrderNumber = () =>{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let trackingNumber = '';
  for (let i = 0; i < 12; i++) {
      trackingNumber += "ODR-"+chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return trackingNumber;
}

export const limitText = (text: string) => (text.length > 10 ? `${text.slice(0, 10)}...` : text);

export const extracted = (data:any) =>{
  const arrayData = [];
  for (let index = 0; index < data?.length; index++) {
    const element = data[index];
    arrayData.push(element);
  }
  return arrayData.sort((a,b)=>b.Quantity - a.Quantity).map((item:any,idx:any)=>{ return item[0]})
}
export const fallbackImage = () =>{
  const path = process.env.NEXT_PUBLIC_PATH || '';

  return `${path}/Thumbnail.png`;
}

export const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = fallbackImage();
  event.currentTarget.srcset = fallbackImage();
};

export  const handleLoading = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const path = process.env.NEXT_PUBLIC_PATH || '';
  event.currentTarget.src = `${path}/Loading.webp`;
  event.currentTarget.srcset = `${path}/Loading.webp`;
};

export const createdPath = (data: any) => {
  const path = process.env.NEXT_PUBLIC_PATH || '';
  return `${path}Products/${data.id}`;
};

export const imageSource = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item?.thumbnail ? `${item.thumbnail}` : fallbackImage()
}

export const imageSource_cart = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item?.Thumbnail ? `${item.Thumbnail}` : fallbackImage()
}
export const imageSourceOrder = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item.Image ? `${item.Image}` : fallbackImage()
}

export const imageSource_category = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item[0].image ? `${item[0].image}` : fallbackImage()
  console.log(item)
}


export const imageSourceGallery = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item.ImagePath ? `${item.ImagePath}` : fallbackImage()
}


export const Cart = (viewedProd:any,Manager:any,quantity:any) => {
  Manager.Success("Added to cart!");
  return viewedProd.map((item: any) => ({
    "productCode": item.productCode,
    "Thumbnail": item.thumbnail,
    "Name": item.name,
    "Price": item.price,
    "Size": item.size,
    "Color": item.color,
    "Model": item.model,
    "Quantity": quantity,  // Assuming there's a quantity property in your item object
    "agentEmail":item.agentEmail
  }));
};

export const replaceOembedWithIframe = (htmlContent) =>{
  if (!htmlContent) return '';

  // Regular expression to detect <oembed> tags with YouTube URLs
  const oembedRegex = /<oembed url="https:\/\/youtu\.be\/(.*)"><\/oembed>/g;

  // Replace <oembed> with corresponding <iframe>
  const updatedContent = htmlContent.replace(
    oembedRegex,
    (match, videoId) => {
      // Return the iframe for YouTube videos
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
  );

  return updatedContent;
}


export  const ratings = (feedBackData:any) =>{
  const filteredFeedback = feedBackData;
  const totalRatings = filteredFeedback?.reduce((sum, item) => {
  return sum + (item.Ratings || 0); // Add the ratings, ensure ratings is not undefined
}, 0);
// Return the filtered data and the sum of ratings
const result = {
  filteredFeedback, // The filtered feedback items
  totalRatings,     // The sum of all ratings
};

return result?.totalRatings / filteredFeedback?.length;  
}

export const drawer = (drawerState:Boolean) =>{
  if(drawerState){
    setGlobalState("drawer",false);
  }else{
    setGlobalState("drawer",true);
  }
}

export const ClearStorage = (DeleteState:any,name:string) =>{
  localStorage.removeItem(name);
  DeleteState(0);
}

export const maskEmail = (email:any) => {
  const [name, domain] = email.split('@'); // Split email into name and domain parts
  const maskedName = name.slice(0, 3) + '*'.repeat(10 - 5); // Show first 5 characters, mask the rest
  return `${maskedName}@${domain}`; // Return masked email
}
