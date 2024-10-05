'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import AccountMenu from 'components/Account/AccountMenu'
import { useGlobalState } from 'state'
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