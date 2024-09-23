'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import FaQ from 'components/About/FaQ'
import { cookies } from 'components/cookies/cookie'

const page = () => {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
      <FaQ/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default page