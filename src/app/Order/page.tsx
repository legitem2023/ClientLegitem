"use client"
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageOrder from 'components/Order/PageOrder'
import { useRouter } from 'next/navigation';
import { cookies } from 'components/cookies/cookie';
import { useEffect, useState } from 'react';
import Loading from 'components/Partial/LoadingAnimation/Loading'
export default function Order() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false); // End loading state
  }, [router,cookies,setIsAuthorized]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }
  return isAuthorized?(
    <div className='Main'>
      <PageHeader/>
        <PageOrder/>
      <PageFooter/>
    </div>
  ): null
}
