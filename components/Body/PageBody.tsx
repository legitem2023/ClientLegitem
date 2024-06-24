'use client'
import React, { useState } from 'react'
import Menu from '../Menu'
import Thumbnails from '../Products/Thumbnails'

import Carousel from 'components/Carousel'
import { Icon } from '@iconify/react'
import { setGlobalState, useGlobalState } from 'state'





const PageBody = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const searchEngine = ((e:any)=>{
    setGlobalState("thumbnailSearch",e.target.value);
  })

  const sort = ((e:any)=>{
    setGlobalState("descAsc",e.target.value);
  })
  return (
    <div className='body'>
        <div className='dropdown openDrawer'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>

      
        <div className='LeftWing'>
            <Menu/>
            <Icon icon="emojione-monotone:up-arrow" className='goUp' onClick={()=>scrollToTop()}/>
        </div>
        <div className='dropdown closeDrawer'>
          <Icon icon='mdi:close-box' />
        </div>
        <div className='middlecontainer'>
            <div className='searchContaier'>
              <div><input type='text' placeholder='Search' onChange={(e:any)=>searchEngine(e)}></input></div>
              <div>
                <label htmlFor="mySelect" className='hidden'>Choose an option:</label>
                <select onChange={(e:any)=>sort(e)} id='mySelect'>
                  <option>Sort By</option>
                  <option>High to Low</option>
                  <option>Low to High</option>
                </select>
              </div>
            </div>
            <div className='carousel'>
              <div className='LabelHead carouselLabel'><Icon icon="dashicons:store"/> Stores</div>
              <Carousel></Carousel>
              <div className='LabelHead carouselLabel'><Icon icon="bi:tags-fill"/> Products</div>
            </div>
            <Thumbnails/>
        </div>
        <div className='RightWing'>
          <div className='Banner'></div>
        </div>
    </div>
  )
}

export default PageBody