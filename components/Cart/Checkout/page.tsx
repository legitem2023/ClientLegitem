'use client'
import Addresses from 'components/Account/Accordion';
import { cookies } from 'components/cookies/cookie';
import React, { useEffect, useState } from 'react'
const CheckoutData = () => {
  const [useCookie,setCookie] = useState();
  useEffect(()=>{
    const cookie = cookies();
    const id:any = cookie.id;  
    setCookie(id);
  },[])
  return (
    <div>
      <Addresses userId={useCookie}/>
    </div>
  )
}

export default CheckoutData