
"use client";
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Account() {
  const router = useRouter();
  const [useCookie,setCookie] = useState();
  useEffect(()=>{
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');  
      return;
    }
  const id:any = cookie.id;
  setCookie(id);
  },[])

  return (
    <div className='Main'>
      <PageHeader/>
        <PageAccount userId={useCookie}/>
      <PageFooter/>
    </div>
  )
}
