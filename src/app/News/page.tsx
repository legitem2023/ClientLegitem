'use client'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { cookies } from 'components/cookies/cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    cookies();
  }, [router]);

  return (
    <div className='Main'>
      <PageHeader/>
        <NewsData/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default page