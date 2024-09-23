'use client'
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'
import { setGlobalState } from 'state';
import { cookies } from 'components/cookies/cookie';
import { useEffect } from 'react';

export default function Index() {
  setGlobalState("drawer",true);
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
        <HomeBody/>
      <PageFooter/>
    </div>
  )
}
