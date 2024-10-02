"use client"
import CartBody from 'components/Cart/CartBody'
import { cookies } from 'components/cookies/cookie'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
  }, [router,cookies,setIsAuthorized]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }
  return (
    <div className='Main'>
      <PageHeader/>
        <CartBody/>
      <PageFooter/>
    </div>
  )
}

export default Cart