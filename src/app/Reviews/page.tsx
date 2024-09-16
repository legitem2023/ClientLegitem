'use client'
import Accordion from 'components/Accordion/Accordion'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import FAQ from 'json/faq.json'
import Privacy from 'components/About/Privacy'

const page = () => {
  return (
    <div className='Main'>
      <PageHeader/>
        <Privacy/>
        <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default page