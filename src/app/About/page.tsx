'use client'
import Accordion from 'components/Accordion/Accordion'
import NewsData from 'components/News/NewsData'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import FAQ from 'json/faq.json'
import ContactUs from 'components/ContactUs/ContactUs'
import DataManager from 'utils/DataManager'
import { CONTACT_US } from 'graphql/mutation'
import { useMutation } from '@apollo/client'
import About from 'components/About/About'

const page = () => {

  return (
    <div className='Main'>
      <PageHeader/>
      <About/>
      <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default page