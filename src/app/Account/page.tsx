
"use client";
import PageHeader from '../../../components/Header/PageHeader' 
import PageFooter from '../../../components/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { useEffect } from 'react';
import { cookies } from 'components/cookies/cookie';
import { useGlobalState } from 'state';
import DataManager from 'utils/DataManager';
export default function Account() {
  const [userId] = useGlobalState("cookieActiveUser");


  return (
    <div className='Main'>
      <PageHeader/>
        <PageAccount userId={userId}/>
      <PageFooter/>
    </div>
  )
}
