'use client'
import Accordion from 'components/Accordion/Accordion'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import FAQ from 'json/faq.json'
import Privacy from 'components/About/Privacy'
import Reviews from 'components/Reviews/Reviews'
import { cookies } from 'components/cookies/cookie'

const page = () => {
  useEffect(()=>{
    cookies();
  },[cookies])
  return (
    <div className='Main'>
      <PageHeader/>
        <Reviews/>
      <PageFooter/>
    </div>
  )
}

export default page