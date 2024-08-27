'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import transactionData from '../../json/transactionStages_client.json'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { READ_ORDERS } from 'graphql/queries'
import { useGlobalState } from 'state'
import { cookies } from 'components/cookies/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import AccordionOrders from 'components/AccordionOrders/AccordionOrders'


const PageOrder = () => {
  const [drawerState] = useGlobalState("drawer");

  useEffect(()=>{
    cookies();
  })
  const [cookieEmailAddress] = useGlobalState("cookieEmailAddress");
  const { data,loading,error} = useQuery(READ_ORDERS,{variables:{emailAddress:cookieEmailAddress}})
  if(loading) return <Loading/>
  if(error) return "Connection Error";

  console.log(data.readGroupedOrderHistory);
  // const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const path = process.env.NEXT_PUBLIC_PATH




  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <AccountMenu />
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
              <div>
              <AccordionOrders json={data.readGroupedOrderHistory}/>
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