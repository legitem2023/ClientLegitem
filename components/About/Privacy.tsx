import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import privacyPolicyData from 'json/Private.json'
import { Icon } from '@iconify/react'
const Privacy = () => {
  return (
    <div className=''>
      <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-privacy-tip"  /><span>Privacy</span></div>
        <div className='Privacy'>
        <div>
            <PrivacyPolicy privacyPolicyData={privacyPolicyData} />
        </div>
        </div>
    </div>
  )
}

export default Privacy