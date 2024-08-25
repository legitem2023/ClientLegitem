'use client'
import { Icon } from '@iconify/react'
import React from 'react'
const PageFooter = () => {
  return (
    <div className='footer'>
      <div className='Mobile_footer'>
        <div><Icon icon="iconamoon:profile-fill" /></div>
        <div><Icon icon="bxs:basket" /></div>
        <div><Icon icon="mdi:like" /></div>
        <div><Icon icon="mdi:cart" /></div>
      </div>
      <div className='foot_label'>
        About
      <ul>
        <li>Legitem History</li>
        <li></li>
        <li></li>
      </ul>
      </div>
      <div className='foot_label'>
        Shopping Guide
      <ul>
        <li>How to Order</li>
        <li></li>
        <li></li>
      </ul>
      </div>
      <div className='foot_label'>Service
      <ul>
        <li>Live Chat</li>
        <li>Contact Us</li>
        <li></li>
      </ul>
      </div>
      <div className='foot_label'>Legal
      <ul>
        <li>Disclaimer</li>
        <li>Terms of Privacy</li>
        <li>Terms of Use</li>
      </ul>
      </div>
    </div>
  )
}

export default PageFooter
