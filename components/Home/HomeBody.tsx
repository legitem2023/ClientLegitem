'use client'
import { Icon } from '@iconify/react'
import { Gallery } from 'components/Gallery/Gallery'
import Menu from 'components/Menu'
import React from 'react'
import ThreeJS from 'components/ThreeJS/ThreeJS'


const HomeBody = () => {
  return (
    <div className='body'>
      <div className='dropdown openDrawer'>
        <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
      </div>
      <div className='LeftWing'>
        <Menu />
      </div>
      <div className='middlecontainer'>
        <div></div>
        <div className='ThreeJS' id='ThreeJS'>
          <ThreeJS />
        </div>
        <div className='carousel'>

          <div className='LabelHead carouselLabel'><Icon icon="bxs:category" /><span>Category</span></div>
          <Gallery></Gallery>
          {/* <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-real-estate-agent" /><span>Real State</span></div> */}
        </div>
      </div>
      <div className='RightWing'>

      </div>
    </div>
  )
}

export default HomeBody