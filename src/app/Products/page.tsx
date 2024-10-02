'use client'
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageBody from '../../../components/Body/PageBody'
import { useEffect } from 'react';
import { cookies } from 'components/cookies/cookie';
import { setGlobalState } from 'state';

export default function Index() {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
      <PageHeader/>
        <PageBody/>
      <PageFooter/>
    </div>
  )
}
