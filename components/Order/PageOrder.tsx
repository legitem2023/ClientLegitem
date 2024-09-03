'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import transactionData from '../../json/transactionStages_client.json'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery, useSubscription } from '@apollo/client'
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
import useOrderStatusNotification from 'components/Hooks/useOrderStatusNotification'

const PageOrder = () => {
  const [drawerState] = useGlobalState("drawer");
  const { updateNewOrder,updateRecieved,updateLogistic,updateDelivery,updateDelivered } = useOrderStatusNotification();

  useEffect(()=>{
    cookies();
  })
  const [CurrentOrderStage] = useGlobalState("CurrentOrderStage");
  const [cookieEmailAddress] = useGlobalState("cookieEmailAddress");
  const { data:newOrder,loading:newOrderLoading,error,refetch:refetchNew} = useQuery(READ_ORDERS,{variables:{emailAddress:cookieEmailAddress}});
  const { data:recievedOrder,loading:recievedOrderLoading,refetch:refetchrecieved} = useQuery(READ_ORDERS_RECIEVED,{variables:{emailAddress:cookieEmailAddress}});
  const { data:packedOrder,loading:packedOrderLoading,refetch:refetchpacked} = useQuery(READ_ORDERS_PACKED,{variables:{emailAddress:cookieEmailAddress}});
  const { data:logisticOrder,loading:logisticOrderLoading,refetch:refetchlogistic} = useQuery(READ_ORDERS_LOGISTIC,{variables:{emailAddress:cookieEmailAddress}});
  const { data:deliverOrder,loading:deliverOrderLoading,refetch:refetchdeliver} = useQuery(READ_ORDERS_DELIVER,{variables:{emailAddress:cookieEmailAddress}});
  const { data:deliveredOrder,loading:deliveredOrderLoading,refetch:refetchdelivered} = useQuery(READ_ORDERS_DELIVERED,{variables:{emailAddress:cookieEmailAddress}});

  if(newOrderLoading) return <Loading/> 
  if(recievedOrderLoading) return <Loading/>
  if(packedOrderLoading) return <Loading/>
  if(logisticOrderLoading) return <Loading/>
  if(deliverOrderLoading) return <Loading/>
  if(deliveredOrderLoading) return <Loading/>
  if(error) return "Connection Error";

  refetchNew();
  refetchrecieved();
  refetchpacked();
  refetchlogistic();
  refetchdeliver();
  refetchdelivered();

  // const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const path = process.env.NEXT_PUBLIC_PATH

  const optionalRender = () =>{
      if(CurrentOrderStage==='New Order'){
        return <AccordionOrders json={newOrder?.getGroupedOrderHistory}/>
      }
      if(CurrentOrderStage==='Recieved'){
        return <AccordionOrderRecieved json={recievedOrder?.getGroupedOrderHistoryRecieved}/>
      }
      if(CurrentOrderStage==='Packed'){
        return <AccordionOrderPacked json={packedOrder?.getGroupedOrderHistoryPacked}/>
      }
      if(CurrentOrderStage==='Logistic'){
        return <AccordionOrderLogistic json={logisticOrder?.getGroupedOrderHistoryLogistic}/>
      }
      if(CurrentOrderStage==='Delivery'){
        return <AccordionOrderDelivered json={deliverOrder?.getGroupedOrderHistoryDelivery}/>
      }
      if(CurrentOrderStage==='Delivered'){
        return <AccordionOrderDeliver json={deliveredOrder?.getGroupedOrderHistoryDelivered}/>
      }

  }

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
                      <span key={idx} onClick={()=>setGlobalState("CurrentOrderStage",item.URL)}>                    
                          {item.Name === 'New Order'?<span className='OrderStageNotification' style={{'display':updateNewOrder===0?'none':'flex'}}>{updateNewOrder}</span>:null}
                          {item.Name === 'Recieve'?<span className='OrderStageNotification' style={{'display':updateRecieved===0?'none':'flex'}}>{updateRecieved}</span>:null}
                          {item.Name === 'Logistic'?<span className='OrderStageNotification' style={{'display':updateLogistic===0?'none':'flex'}}>{updateLogistic}</span>:null}
                          {item.Name === 'Delivery'?<span className='OrderStageNotification' style={{'display':updateDelivery===0?'none':'flex'}}>{updateDelivery}</span>:null}
                          {item.Name === 'Delivered'?<span className='OrderStageNotification' style={{'display':updateDelivered===0?'none':'flex'}}>{updateDelivered}</span>:null}
                          <Image src={item.Image} height='50' width='50' alt={idx} className='TransactionImage'></Image>
                      </span>
                  ))
                  }
              </div>
              <div>
              {optionalRender()}
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