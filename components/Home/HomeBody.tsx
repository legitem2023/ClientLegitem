'use client'
import Menu from 'components/Partial/Menu'
import React from 'react'
import { ViewGallery } from 'components/Gallery/ViewGallery'
import { useGlobalState } from 'state'
import { Icon } from '@iconify/react'
import Carousel from 'components/Carousel'
import Commercial3DModel from 'components/Partial/ThreeJS/Commercial3DModel'
import ThreeJS from 'components/Partial/ThreeJS/ThreeJS'
const HomeBody = () => {
  const [drawerState] = useGlobalState("drawer");
  const path = useGlobalState("activeModel");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <Menu />
      </div>
      <div className='middlecontainer'>
      <div className='LabelHead carouselLabel'><Icon icon="dashicons:store" /> Stores</div>
        {/* <ThreeJS/> */}
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