'use client'
import Menu from 'components/Partial/Menu'
import React from 'react'
import { ViewGallery } from 'components/Gallery/ViewGallery'
import { useGlobalState } from 'state'
import { Icon } from '@iconify/react'
import Carousel from 'components/Carousel'
const HomeBody = () => {
  const [drawerState] = useGlobalState("drawer");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <Menu />
      </div>
      <div className='middlecontainer'>
      <div className='LabelHead carouselLabel'><Icon icon="dashicons:store" /> Stores</div>
        <div className='carousel'>
          <Carousel></Carousel>
        </div>
      </div>
      <div className='RightWing'>

      </div>
    </div>
  )
}

export default HomeBody