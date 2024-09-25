'use client'
import React, { useEffect, useState } from 'react'
import CrowdMessages from 'components/Crowd/CrowdMessages'
import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import { cookies } from 'components/cookies/cookie'
import { useRouter } from 'next/navigation'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import LoadActiveUsers from 'components/Partial/Header/LoadActiveUsers'
import { setGlobalState } from 'state'

const Crowd = () => {
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

  return isAuthorized ? (
    <div className='Main'>
      <PageHeader />
      <LoadActiveUsers/>
      <CrowdMessages />
      <PageFooter />
    </div>
  ) : null;
};

export default Crowd;
