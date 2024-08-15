'use client'
import React from 'react'
import Navigation from '../../json/navigation.json'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
import { cookies } from 'components/cookies/cookie';
const PageHeader = () => {
  const path = process.env.NEXT_PUBLIC_PATH
  const [userId] = useGlobalState("cookieActiveUser");

  return (
    <div className='Header'>
      <Link className='Logo' href={path + `Home`}>.</Link>
      <div className='Navigation'>
        {Navigation.map((item: any, idx: any) => (
          item.Name === 'Account' ? 
          <nav key={idx} className={item.Name === 'Account' ? 'Account' : ''}>
            <Icon icon={item.icon} />
            <Link href='./Login'>
              <span className='hideInmobile'>{item.Name === 'Account' ? userId === "undefined" || userId === undefined ? "Login" : item.Name : item.Name}</span></Link>
                {userId === "undefined" || userId === undefined ? "" : item.Name === 'Account' ?
                  <div className='DroppedDown'>
                    <ul>
                      <li><Link href={path + "Account"} className='DroppedDownAnchor'><Icon icon="iconamoon:profile-fill" /> Profile</Link></li>
                      <li><Link href={path + "Order"} className='DroppedDownAnchor'><Icon icon="bxs:basket" /> My Orders</Link></li>
                      <li><Link href={path + "Likes"} className='DroppedDownAnchor'><Icon icon="mdi:like" /> Likes</Link></li>
                      <li><Link href={path + "Account"} className='DroppedDownAnchor'><Icon icon="material-symbols:logout-sharp" /> Log out</Link></li>
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
  )
}

export default PageHeader