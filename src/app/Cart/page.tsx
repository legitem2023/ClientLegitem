import CartBody from 'components/Cart/page'
import PageFooter from 'components/Footer/PageFooter'
import PageHeader from 'components/Header/PageHeader'
import React from 'react'

const Cart = () => {
  return (
    <div className='Main'>
      <PageHeader/>
        <CartBody/>
      <PageFooter/>
    </div>
  )
}

export default Cart