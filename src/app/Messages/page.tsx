"use client"
import React, { useEffect, useState } from 'react'

import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'
import { useRouter } from 'next/navigation'
import { cookies } from 'components/cookies/cookie'
import PersonalMessages from 'components/PersonalMessages/PersonalMessages'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import LoadActiveUsers from 'components/Partial/Header/LoadActiveUsers'
import { setGlobalState } from 'state'

const Messages = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // setGlobalState("drawer",false);
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
  }, [router]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }

  return  isAuthorized ?(
    <div className='Main'>
      <PageHeader />
      <LoadActiveUsers/>
      <PersonalMessages/>
      <PageFooter />
    </div>
  ): null
}

export default Messages