'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Disclaimer from 'components/About/Disclaimer'
import { cookies } from 'components/cookies/cookie'

const Disclaimerpage = () => {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
      <Disclaimer/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default Disclaimerpage