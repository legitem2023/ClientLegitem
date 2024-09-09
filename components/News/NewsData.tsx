'use client';
import { Icon } from '@iconify/react';

import AccordionAddress from '../AccordionAddress/AccordionAddress'
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { useGlobalState } from 'state';
import News from './News';
interface PageAccountProps {
  userId: string;
}

const NewsData = () => {
  const [drawerState] = useGlobalState("drawer");
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        
      </div>
      <div className='middlecontainer'>
            <News/>
      </div>
      <div>
      </div>
    </div>
  );
};

export default NewsData;
