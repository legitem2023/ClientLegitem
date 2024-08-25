import React, { useEffect } from 'react'
import CrowdMessages from 'components/Crowd/CrowdMessages'

import PageHeader from '../../../components/Partial/Header/PageHeader'
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import HomeBody from '../../../components/Home/HomeBody'

const Crowd = () => {
  return (
    <div className='Main'>
      <PageHeader />
      <CrowdMessages />
      <PageFooter />
    </div>
  )
}

export default Crowd