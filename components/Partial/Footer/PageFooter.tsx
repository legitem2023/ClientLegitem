'use client'
import { Icon } from '@iconify/react'
import React from 'react'
import Share from '../Share/Share'
import Link from 'next/link'
const PageFooter = () => {
  return (
    <div className='footer'>
      <div className='FootHeader'>
        <Icon icon="entypo-social:facebook" style={{color:'#104291'}}/>
        <Icon icon="entypo-social:instagram" style={{color:'#d609ad'}}/>
        <Icon icon="entypo-social:youtube" style={{color:'#ff0000'}}/>
      </div>
      <div className='FootCenter'>
      <Link href='./About' className='foot_label'>
        About Legitem
      </Link>
      {/* <Link href='./ShoppingGuide' className='foot_label'>
        Shopping Guide
      </Link>
      <Link href='./Services' className='foot_label'>
        Service
      </Link> */}
      <Link href='./FAQ' className='foot_label'>
        FAQ
      </Link>
      <Link href='./Disclaimer' className='foot_label'>
        Disclaimer
      </Link>
      <Link href='./Privacy' className='foot_label'>
        Privacy
      </Link>
      <Link href='./Contact' className='foot_label'>
        Contact Us
      </Link>
      </div>
      <div className='FootFooter'>
        All Right Reserved ©2024
      </div>
    </div>
  )
}

export default PageFooter
