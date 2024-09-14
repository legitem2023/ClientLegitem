'use client'
import React, { useEffect } from 'react'
import Navigation from '../../../json/navigation.json'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { setGlobalState, useGlobalState } from 'state';
import { deletecookies } from 'components/cookies/cookie';
import { useRouter } from 'next/navigation';
import OrderNotification from 'components/Notification/OrderNotification'

import InstallPWAButton from '../InstallationApp/InstallPWAButton';
import { useMutation } from '@apollo/client';
import { SET_ACTIVE_USERS } from 'graphql/mutation';


const PageHeader = () => {
  const path = process.env.NEXT_PUBLIC_PATH
  const [userId] = useGlobalState("cookieActiveUser");
  const [drawerState] = useGlobalState("drawer");
  const [cookieEmailAddress]:any = useGlobalState("cookieEmailAddress");
  const [insertMessage] = useMutation(SET_ACTIVE_USERS,{
    onCompleted: (data) => {
        console.log(data)
    },
})

useEffect (()=>{
    insertMessage({
            variables:{
                "emailAddress": cookieEmailAddress
      }})        
},[cookieEmailAddress])
  
  const drawer = () =>{
    if(drawerState){
      setGlobalState("drawer",false);
    }else{
      setGlobalState("drawer",true);
    }
  }
  const redirect = useRouter();
  return (
    <>
      <InstallPWAButton/>
    <div className='Header'>
        <div className='HeaderNav'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' onClick={()=>drawer()}/>  
        </div>
        <span className='Logo openDrawer' onClick={()=>redirect.push('/Home')}></span>
      <div className='Navigation'>
        {Navigation.map((item: any, idx: any) => (
          item.Name === 'Account' ? 
          <nav key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
            <Icon icon={item.icon} />
            <Link href='./Login'>
              <span className='hideInmobile'>{item.Name === 'Account' ? userId === ""? "Login" : item.Name : item.Name}</span></Link>
                {userId === ""?"" : item.Name === 'Account' ?
                  <div className='DroppedDown'>
                    <ul>
                      <li><Link href={path + "Account"} className='DroppedDownAnchor'><Icon icon="ph:address-book-fill" /><span>Address Book</span></Link></li>
                      <li><Link href={path + "Order"} className='DroppedDownAnchor'><Icon icon="bxs:basket" /><span>My Orders</span><OrderNotification/></Link></li>
                      <li><Link href={path + "Likes"} className='DroppedDownAnchor'><Icon icon="mdi:like" /><span>Likes</span></Link></li>
                      <li><Link href={path + "Messages"} className='DroppedDownAnchor'><Icon icon="ic:baseline-message" /><span>Messages</span></Link></li>
                      <li><Link href={path + "Account"} onClick={() => deletecookies("clientToken")} className='DroppedDownAnchor'><Icon icon="material-symbols:logout-sharp" /><span>Log out</span></Link></li>
                    </ul>
                  </div> : ""}
          </nav> :<Link href={item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                    <Icon icon={item.icon} />
                    <span className='hideInmobile'>{item.Name}</span>
                    
                  </Link>

        ))}
      </div>
      <div></div>
    </div>
    </>
  )
}

export default PageHeader