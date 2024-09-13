"use client"
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import PageOrder from 'components/Order/PageOrder'
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';
import { useEffect } from 'react';
export default function Order() {
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
        <PageOrder/>
      <PageFooter/>
    </div>
  )
}
