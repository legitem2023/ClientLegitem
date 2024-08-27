import React from 'react'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import CheckoutData from 'components/Checkout/page'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Checkout = () => {
  return (
    <div className='Main'>
      <PageHeader/>
        <CheckoutData/>
        <ToastContainer/>
    </div>
  )
}

export default Checkout