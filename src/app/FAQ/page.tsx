'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import FaQ from 'components/About/FaQ'

const page = () => {
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