"use client"
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useEffect } from 'react';
import PageLikes from '../../../components/Likes/PageLikes'
import { useRouter } from 'next/navigation';
export default function Likes() {
  const router = useRouter();
  useEffect(()=>{
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');  
      return;
    }
  },[])
  return (
    <div className='Main'>
      <PageHeader/>
        <PageLikes/>
      <PageFooter/>
    </div>
  )
}
