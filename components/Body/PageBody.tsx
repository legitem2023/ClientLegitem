'use client'
import React, { useState } from 'react'
import Menu from '../Partial/Menu'
import Thumbnails from '../Products/Thumbnails'
import Carousel from 'components/Carousel'
import { Icon } from '@iconify/react'
import { setGlobalState, useGlobalState } from 'state'
const PageBody = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [drawerState] = useGlobalState("drawer");
  const [sortDirection] = useGlobalState("sortDirection");
  const [sortBy] = useGlobalState("sortBy");
  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const searchEngine = ((e: any) => {
    setGlobalState("thumbnailSearch", e.target.value);
  })

  const sort = ((e: any) => {
    setGlobalState("descAsc", e.target.value);
  })

  const handleSort = (column) => {

    console.log(column);

    if (sortBy === column) {
      setGlobalState("sortDirection",sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setGlobalState("sortDirection","asc");
    }
  };


  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <Menu />
        <Icon icon="emojione-monotone:up-arrow" className='goUp' onClick={() => scrollToTop()} />
      </div>
      <div className='middlecontainer'>
        <div className='searchContaier'>
          <div><input type='text' placeholder='Search' onChange={(e: any) => searchEngine(e)}></input></div>
          <div>
            <label htmlFor="mySelect" className='hidden'>Choose an option:</label>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSort(e.target.value)}>
              <option value=''>Sort</option>
              <option value='name'>By Name</option>
              <option value='price'>By Price</option>
            </select>
          </div>
        </div>
        {/* <div className='carousel'> */}
          {/* <div className='LabelHead carouselLabel'><Icon icon="dashicons:store" /> Stores</div>
          <Carousel></Carousel> */}
          <div className='LabelHead carouselLabel'><Icon icon="bi:tags-fill" /> Products</div>
        {/* </div> */}
        <Thumbnails />
      </div>
      <div className='RightWing'>
        <div className='Banner'></div>
      </div>
    </div>
  )
}

export default PageBody