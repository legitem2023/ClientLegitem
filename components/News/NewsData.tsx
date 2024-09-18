'use client';
import { Icon } from '@iconify/react';

import AccordionAddress from '../AccordionAddress/AccordionAddress'
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { useGlobalState } from 'state';
import News from './News';
import PostedBy from './PostedBy';
interface PageAccountProps {
  userId: string;
}

const NewsData = () => {
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
