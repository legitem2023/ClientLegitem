'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import transactionData from '../../json/transactionStages_client.json'
import Link from 'next/link'
import Image from 'next/image'


const PageOrder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const path = process.env.NEXT_PUBLIC_PATH

  return (
    <div className='body'>
        <div className='dropdown openDrawer'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>
        <div className='LeftWing'>
          <AccountMenu/>
            <Icon icon="emojione-monotone:up-arrow" className='goUp' onClick={()=>scrollToTop()}/>
        </div>
        <div className='middlecontainer'>
        <div className='OrderDetails'>
            <div className='OrderList'>
              <div className='LabelHead carouselLabel'>
              <Icon icon="bxs:basket" /> Order Details
              </div>

              <div className='OrderStages'>{
                  transactionData.map((item:any,idx:any)=>(
                      <Link href={path+item.URL} key={idx}> 
                          <Image src={item.Image} height='50' width='50' alt={idx} className='TransactionImage'></Image>
                      </Link>
                  ))
                  }
              </div>


            </div>
          </div>
        </div>
        <div className='RightWing'>
          <div className='Banner'></div>
        </div>
    </div>
  )
}

export default PageOrder