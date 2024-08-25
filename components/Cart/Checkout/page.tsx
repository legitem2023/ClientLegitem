'use client'
import Addresses from 'components/Account/Accordion';
import { cookies } from 'components/cookies/cookie';
import React, { useEffect, useState } from 'react'
const CheckoutData = () => {
  // const [useStorage,setStorage] = useState(null);
  const cookie = cookies();
  const id = cookie.id;
  useEffect(()=>{
    // setStorage(localStorage.getItem("cartItems"))
  },[])
  return (
    <div>
      <Addresses userId={id}/>
    </div>
  )
}

export default CheckoutData