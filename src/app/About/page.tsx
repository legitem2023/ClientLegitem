'use client'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import About from 'components/About/About'
import { cookies } from 'components/cookies/cookie'
import { setGlobalState } from 'state'

const Aboutpage = () => {
  setGlobalState("drawer",true);
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
      <About/>
      <ToastContainer/>
      <PageFooter/>
    </div>
  )
}

export default Aboutpage