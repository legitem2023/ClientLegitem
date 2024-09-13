"use client"
import React, { useEffect, useState } from 'react'

import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'
import { useRouter } from 'next/navigation'
import { cookies } from 'components/cookies/cookie'
import PersonalMessages from 'components/PersonalMessages/PersonalMessages'

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
      <PersonalMessages/>
      <PageFooter />
    </div>
  )
}

export default Messages