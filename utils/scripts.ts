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

