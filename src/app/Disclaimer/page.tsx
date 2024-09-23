'use client'
import Accordion from 'components/Accordion/Accordion'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import FAQ from 'json/faq.json'
import Disclaimer from 'components/About/Disclaimer'
import { cookies } from 'components/cookies/cookie'

const page = () => {
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

export default page