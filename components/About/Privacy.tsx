import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import privacyPolicyData from 'json/Private.json'
import { Icon } from '@iconify/react'
import { useGlobalState } from 'state'
const Privacy = () => {
  const [drawerState] = useGlobalState("drawer");
  return (
    <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
          <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-privacy-tip"  /><span>Privacy</span></div>
            <div className='Privacy'>
            <div>
                <PrivacyPolicy privacyPolicyData={privacyPolicyData} />
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