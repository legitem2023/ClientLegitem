'use client';
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
import News from './News';
import PostedBy from './PostedBy';
import React from 'react';

const NewsData:React.FC = () => {
  const [drawerState] = useGlobalState("drawer");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <PostedBy/>
      </div>
      <div className='middlecontainer'>
      <div className='LabelHead carouselLabel'><Icon icon="fa6-solid:newspaper" /><span>News</span></div>
        <News/>
      </div>
      <div>
      </div>
    </div>
  );
};

export default NewsData;
