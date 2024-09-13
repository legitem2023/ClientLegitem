"use client"
import React, { useEffect, useState } from 'react'
import CrowdMessages from 'components/Crowd/CrowdMessages'

import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'
import { useRouter } from 'next/navigation'
import { cookies } from 'components/cookies/cookie'

const Messages = () => {
    const router = useRouter();
    useEffect(()=>{
      const cookie = cookies();
      if (!cookie) {
        router.push('/Login');  
        return;
      }
    },[])
  return (
    <div className='Main'>
      <PageHeader />
      {/* <CrowdMessages /> */}
      <PageFooter />
    </div>
  )
}

export default Messages