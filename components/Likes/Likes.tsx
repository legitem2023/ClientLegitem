'use client'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import { useQuery } from '@apollo/client'
import { READ_ORDERS,READ_ORDERS_RECIEVED,READ_ORDERS_PACKED,READ_ORDERS_LOGISTIC,READ_ORDERS_DELIVER,READ_ORDERS_DELIVERED, READ_LIKES } from 'graphql/queries'
import { useGlobalState } from 'state'
import { cookies } from 'components/cookies/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import LikesData from './LikesData'


const Likes:React.FC = () => {
  const [drawerState] = useGlobalState("drawer");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <AccountMenu />
      </div>
        <div className='middlecontainer'>
          <div className='LabelHead carouselLabel'><Icon icon="mdi:like" /> Likes</div>
            <LikesData/>
          </div>
        <div className='RightWing'>
          <div className='Banner'></div>
        </div>
    </div>
  )
}

export default Likes