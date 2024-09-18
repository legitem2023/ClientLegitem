'use client'
import React, { useEffect, useState } from 'react'
import Navigation from '../../../json/navigation.json'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { setGlobalState, useGlobalState } from 'state';
import { deletecookies } from 'components/cookies/cookie';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const currentPath = usePathname();


  const handleClick = (item: any) => {
    console.log(item.Link+"----"+currentPath)
    if (item.Link !== "."+currentPath) {
      setLoadingLink(item.Name); // Set loading for clicked link only if it's not the current page
    }
  };
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
            {userId === ""?
              <Link href='./Login'>
                <Icon icon="ic:round-login" />
                <span className='hideInmobile'>Login</span>
              </Link>
            :
            <>
              <Icon icon={item.icon} />
              <span className='hideInmobile'>{item.Name}</span>
            </>
            }
            {userId === ""?"" : item.Name === 'Account' ?
              <Dropdown path={path} deletecookies={deletecookies} OrderNotification={OrderNotification}/>: ""
            }
          </nav>:<Link onClick={() => handleClick(item)} href={item.Link} key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
                  {loadingLink === item.Name && item.Link !== "."+currentPath ? (
                    <Icon icon="eos-icons:loading" /> // Loading icon
                  ) : (
                    <Icon icon={item.icon} /> // Normal icon
                  )}
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