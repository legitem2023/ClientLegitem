'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Contact from 'components/About/Contact'

const page = () => {
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