
"use client";
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
export default function Account() {
  const [useCookie,setCookie] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      return router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
    const id:any = cookie?.id;
    setCookie(id);
  }, [router]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }
  return isAuthorized?(
    <div className='Main'>
      <PageHeader/>
        <PageAccount userId={useCookie}/>
      <PageFooter/>
    </div>
  ): null
}
