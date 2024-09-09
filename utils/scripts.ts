import { useCallback } from "react";

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  
export const filterAndSumQuantity = (jsonData:any) =>{
  const uniqueEntries = [];
  const sumMap = new Map();
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
  for (let index = 0; index < data.length; index++) {
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
  return `${path}Products/${data.id}?data=${encodeURIComponent(btoa(JSON.stringify(data)))}`;
};

export const imageSource = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item?.thumbnail ? `${imgPath}${item.thumbnail}` : fallbackImage()
}

export const imageSourceOrder = (item:any) =>{
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  return item.Image ? `${imgPath}${item.Image}` : fallbackImage()
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