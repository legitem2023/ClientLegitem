"use client"
import CartBody from 'components/Cart/page'
import { cookies } from 'components/cookies/cookie'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { setGlobalState } from 'state'

const Cart = () => {
  setGlobalState("drawer",true);
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
        <CartBody/>
      <PageFooter/>
    </div>
  )
}

export default Cart