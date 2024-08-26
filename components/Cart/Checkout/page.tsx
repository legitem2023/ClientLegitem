'use client'
import { useQuery } from '@apollo/client';
import AccordionCheckout from 'components/AccordionCheckout/AccordionCheckout';
import { cookies } from 'components/cookies/cookie';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import React, { useEffect, useState } from 'react'
const CheckoutData = () => {
  const [useCookie,setCookie] = useState();
  const { data:AccountDetails, loading:AccountLoading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: useCookie } });
  if(AccountLoading) return <Loading/>
  useEffect(()=>{
    const cookie = cookies();
    const id:any = cookie.id;  
    setCookie(id);
  },[])
  return (
    <div>
      <AccordionCheckout address={AccountDetails.getAccountDetails_id}/>
    </div>
  )
}

export default CheckoutData