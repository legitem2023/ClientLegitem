import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Ratings from 'components/Partial/Ratings/Ratings';
import { READ_FEEDBACK } from 'graphql/queries';
import React from 'react'
import Accordion from './Accordion';
import { useGlobalState } from 'state';

const Reviews: React.FC = () => {
    const [drawerState] = useGlobalState("drawer");
    const { data: feedBackData, loading: feedBackLoading, error: feedBackError } = useQuery(READ_FEEDBACK);
    if(feedBackLoading) return <Loading/>
    if(feedBackError) return
  return (
        <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <Accordion data={feedBackData} />

        </div>
        <div>
        </div>
      </div>
  )
}

export default Reviews