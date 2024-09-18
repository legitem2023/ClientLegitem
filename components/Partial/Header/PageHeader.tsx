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
import LoadActiveUsers from './LoadActiveUsers';
import Dropdown from './Dropdown';


const PageHeader = () => {
  const path = process.env.NEXT_PUBLIC_PATH
  const [userId] = useGlobalState("cookieActiveUser");
  const [drawerState] = useGlobalState("drawer");

  const drawer = () =>{
    if(drawerState){
      setGlobalState("drawer",false);
    }else{
      setGlobalState("drawer",true);
    }
    // return <LoadActiveUsers/>
  }
  const redirect = useRouter();
  return (
    <>
      <InstallPWAButton/>
    <div className='Header'>
        <div className='HeaderNav'>
        
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' onClick={()=>drawer()}>
          </Icon>
        </div>
        <span className='Logo openDrawer' onClick={()=>redirect.push('/Home')}></span>
      <div className='Navigation'>
        {Navigation.map((item: any, idx: any) => (
          item.Name === 'Account' ? 
          <nav key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
            <Link href='./Login'>
            <Icon icon={item.icon} />
              <span className='hideInmobile'>{item.Name === 'Account' ? userId === ""? "Login" : item.Name : item.Name}</span></Link>
                {userId === ""?"" : item.Name === 'Account' ?
                  <Dropdown path={path} deletecookies={deletecookies} OrderNotification={OrderNotification}/>: ""}
          </nav>:<Link href={item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                    <Icon icon={item.icon} />
                    <span className='hideInmobile'>{item.Name}</span>
                    
                  </Link>

        ))}
      </div>
      <div>
        
      </div>
    </div>
    </>
  )
}

export default PageHeader