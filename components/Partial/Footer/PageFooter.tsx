'use client'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Link from 'next/link'
import Notification from 'components/Notification/Notification'
const PageFooter:React.FC = () => {
  const path = process.env.NEXT_PUBLIC_PATH
  const [showNotification, setShowNotification] = useState(true);
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className='footer'>
      <div className='FootRoutes'>
        <Link href={path+`/Home`}>
          <Icon icon="ic:baseline-home" />
        </Link>
        <Link href={path+`/Likes`}>
          <Icon icon="mdi:like" />
        </Link>
        <Link href={path+`/Reviews`}>
          <Icon icon="ic:sharp-reviews" />
        </Link>
        <Link href={path+`/Messages`}>
          <Icon icon="ic:baseline-message" />
        </Link>
        <Link href={path+`/Cart`}>
          <Icon icon="mdi:cart" />        
        </Link>
      </div>
      {showNotification && (
              <Notification onClose={handleCloseNotification} />
        )}
      <div className='FootHeader'>
        <Icon icon="logos:tiktok-icon" />
        <Icon icon="entypo-social:facebook" style={{color:'#104291'}}/>
        <Icon icon="entypo-social:instagram" style={{color:'#d609ad'}}/>
        <Icon icon="entypo-social:youtube" style={{color:'#ff0000'}}/>
      </div>
      <div className='FootCenter'>
      <Link href='./About' className='foot_label'>
        About Legitem
      </Link>
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
