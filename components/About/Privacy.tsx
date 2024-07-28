import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import privacyPolicyData from 'json/Private.json'
const Privacy = () => {

  return (
    <div>
        <PrivacyPolicy privacyPolicyData={privacyPolicyData} />
    </div>
  )
}

export default Privacy