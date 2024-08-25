
"use client";
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useRouter } from 'next/navigation';
export default function Account() {
const cookie = cookies();
const router = useRouter();
    if (!cookie) {
      router.push('/Login');  
      return;
    }
  const id = cookie.id;
  return (
    <div className='Main'>
      <PageHeader/>
        <PageAccount userId={id}/>
      <PageFooter/>
    </div>
  )
}
