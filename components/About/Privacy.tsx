import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import privacyPolicyData from 'json/Private.json'
import { Icon } from '@iconify/react'
import { useGlobalState } from 'state'
import { READ_DISCLAIMER, READ_PRIVACY } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import Loading from 'components/Partial/LoadingAnimation/Loading'
const Privacy = () => {
  const [drawerState] = useGlobalState("drawer");
  const { data, loading,error } = useQuery(READ_PRIVACY);
  if(loading) return <Loading/>
  if(error) return "Connection Error";
  return (
    <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
          <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-privacy-tip"  /><span>Privacy</span></div>
            <div className='Privacy'>
            <div>
                <PrivacyPolicy data={data} />
            </div>
            </div>
        </div>  
        </div>
        <div>
        </div>
  </div>
  )
}

export default Privacy