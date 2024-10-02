'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Contact from 'components/About/Contact'
import { cookies } from 'components/cookies/cookie'

const page = () => {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
      <PageHeader/>
        <Contact/>
      <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default page