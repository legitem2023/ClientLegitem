import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useEffect } from 'react';
import PageLikes from '../../../components/Likes/PageLikes'
export default function Likes() {

  return (
    <div className='Main'>
      <PageHeader/>
        <PageLikes/>
      <PageFooter/>
    </div>
  )
}
