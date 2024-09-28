'use client'
import React, { useState } from 'react'
import Menu from '../Partial/Menu'
import Thumbnails from '../Products/Thumbnails'
import Carousel from 'components/Carousel'
import { Icon } from '@iconify/react'
import { setGlobalState, useGlobalState } from 'state'
import Commercial3DModel from 'components/Partial/ThreeJS/Commercial3DModel'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from 'graphql/queries'
import Loading from 'components/Partial/LoadingAnimation/Loading'
const PageBody = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [drawerState] = useGlobalState("drawer");
  const [sortDirection] = useGlobalState("sortDirection");
  const [sortBy] = useGlobalState("sortBy");
  const [activeModel] = useGlobalState("activeModel")
  const { data:Category, loading, error } = useQuery(GET_CATEGORY);

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

  const handleSortBy = (column) => {
    setGlobalState("sortBy", column);
  };

  const sortTrigger = (() => {
      if(sortDirection === 'asc'){
        setGlobalState("sortDirection", 'desc');
      }else{
        setGlobalState("sortDirection", 'asc');
      }
  }) 

  if(loading) return
  if(error) return "Connection Error";

  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <Menu />
        <Icon icon="emojione-monotone:up-arrow" className='goUp' onClick={() => scrollToTop()} />
      </div>
      <div className='middlecontainer'>
      <div className='LabelHead carouselLabel'><Icon icon="bi:tags-fill" /> Products</div>

        <div className='searchContaier'>
          <div><input type='text' placeholder='Search' onChange={(e: any) => searchEngine(e)}></input></div>
          <div>
            <label htmlFor="mySelect" className='hidden'>Choose an option:</label>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortBy(e.target.value)}>
              <option value=''>Sort</option>
              <option value='name'>By Name</option>
              <option value='price'>By Price</option>
            </select>
          </div>
          <div>
              <button onClick={sortTrigger} aria-label='sort'>
                {sortDirection === 'asc' ? <Icon icon="bx:sort" />: <Icon icon="bx:sort" style={{"transform":"scaleX(-1)"}}/>}
              </button>
          </div>
        </div>
        {/* <Commercial3DModel data={activeModel}/>
         */}
        <div className='carousel'>
          <Carousel data={Category?.getCategory}></Carousel>
        </div>
        <Thumbnails />
      </div>
      <div className='RightWing'>
        <div className='Banner'></div>
      </div>
    </div>
  )
}

export default PageBody