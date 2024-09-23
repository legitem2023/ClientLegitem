'use client'
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageBody from '../../../components/Body/PageBody'
import { useEffect } from 'react';
import { cookies } from 'components/cookies/cookie';

export default function Index() {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
      <PageHeader/>
        <PageBody/>
      <PageFooter/>
    </div>
  )
}
