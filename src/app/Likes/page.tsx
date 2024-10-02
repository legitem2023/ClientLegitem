"use client"
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import PageAccount from '../../../components/Account/PageAccount'
import { cookies } from 'components/cookies/cookie';
import { useEffect, useState } from 'react';
import PageLikes from '../../../components/Likes/LikesData'
import { useRouter } from 'next/navigation';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { setGlobalState } from 'state';
import Likes from 'components/Likes/Likes';
export default function Index() {
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
  }, [router]);

  if (isLoading) {
    return <Loading/>; // Show loading state while checking
  }
  return isAuthorized?(
    <div className='Main'>
      <PageHeader/>
        <Likes/>
      <PageFooter/>
    </div>
  ): null
}
