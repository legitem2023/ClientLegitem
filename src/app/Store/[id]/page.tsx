"use client"
import { cookies } from 'components/cookies/cookie';
import PageFooter from 'components/Partial/Footer/PageFooter';
import PageHeader from 'components/Partial/Header/PageHeader';
import StoreBody from 'components/Store/StoreBody';

import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
        <PageHeader/>
        <StoreBody/>
        <PageFooter/>
    </div>
  )
}
