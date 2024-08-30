'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import transactionData from '../../json/transactionStages_client.json'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { READ_ORDERS,READ_ORDERS_RECIEVED,READ_ORDERS_PACKED,READ_ORDERS_LOGISTIC,READ_ORDERS_DELIVER,READ_ORDERS_DELIVERED } from 'graphql/queries'
import { setGlobalState, useGlobalState } from 'state'
import { cookies } from 'components/cookies/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import AccordionOrders from 'components/AccordionOrders/AccordionOrders'
import AccordionOrderRecieved from 'components/AccordionOrders/AccordionOrderRecieved'
import AccordionOrderPacked from 'components/AccordionOrders/AccordionOrderPacked'
import AccordionOrderLogistic from 'components/AccordionOrders/AccordionOrderLogistic'
import AccordionOrderDelivered from 'components/AccordionOrders/AccordionOrderDelivered'
import AccordionOrderDeliver from 'components/AccordionOrders/AccordionOrderDeliver'


const PageLikes = () => {
  const [drawerState] = useGlobalState("drawer");
  useEffect(()=>{
    cookies();
  })
  const [CurrentOrderStage] = useGlobalState("CurrentOrderStage");
  const [cookieEmailAddress] = useGlobalState("cookieEmailAddress");
  const { data:newOrder,loading:newOrderLoading,error} = useQuery(READ_ORDERS,{variables:{emailAddress:cookieEmailAddress}});
  const { data:recievedOrder,loading:recievedOrderLoading} = useQuery(READ_ORDERS_RECIEVED,{variables:{emailAddress:cookieEmailAddress}});
  const { data:packedOrder,loading:packedOrderLoading} = useQuery(READ_ORDERS_PACKED,{variables:{emailAddress:cookieEmailAddress}});
  const { data:logisticOrder,loading:logisticOrderLoading} = useQuery(READ_ORDERS_LOGISTIC,{variables:{emailAddress:cookieEmailAddress}});
  const { data:deliverOrder,loading:deliverOrderLoading} = useQuery(READ_ORDERS_DELIVER,{variables:{emailAddress:cookieEmailAddress}});
  const { data:deliveredOrder,loading:deliveredOrderLoading} = useQuery(READ_ORDERS_DELIVERED,{variables:{emailAddress:cookieEmailAddress}});


  if(newOrderLoading) return <Loading/>
  if(recievedOrderLoading) return <Loading/>
  if(packedOrderLoading) return <Loading/>
  if(logisticOrderLoading) return <Loading/>
  if(deliverOrderLoading) return <Loading/>
  if(deliveredOrderLoading) return <Loading/>
  if(error) return "Connection Error";

  // const [isVisible, setIsVisible] = useState(false);

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
              <Icon icon="mdi:like" /> Likes
              </div>

              <div className='OrderStages'>
              </div>
              <div>
              {/* {optionalRender()} */}
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

export default PageLikes