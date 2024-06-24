import PageHeader from '../../../components/Header/PageHeader' 
import PageFooter from '../../../components/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useEffect } from 'react';

export default function Likes() {

  return (
    <div className='Main'>
      <PageHeader/>
        {/* <PageAccount/> */}
      <PageFooter/>
    </div>
  )
}
