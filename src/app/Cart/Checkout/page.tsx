import React from 'react'
import PageFooter from 'components/Partial/Footer/PageFooter'
import PageHeader from 'components/Partial/Header/PageHeader'
import CheckoutData from 'components/Cart/Checkout/page'
const Checkout = () => {
  return (
    <div className='Main'>
      <PageHeader/>
        <CheckoutData/>
      <PageFooter/>
    </div>
  )
}

export default Checkout