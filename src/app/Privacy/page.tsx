'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Privacy from 'components/About/Privacy'
import { cookies } from 'components/cookies/cookie'

const PrivacyPage = () => {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
        <Privacy/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default PrivacyPage