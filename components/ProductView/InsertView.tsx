import { useEffect } from "react";

const InsertView = ({insertNumberOfViews,userEmail,ViewProduct}) => {
useEffect( () => {
     insertNumberOfViews({
      variables:{
        "count": "1",
        "productCode": ViewProduct?.productCode,
        "emailAddress": userEmail,
        "ipAddress": "ipaddresses",
        "country": "PH"
      }
    });
},[ViewProduct])
  return (
    <div></div>
  );
};

export default InsertView;
