import React, { useEffect } from 'react'
import CrowdMessages from 'components/Crowd/CrowdMessages'

import PageHeader from '../../../components/Header/PageHeader'
import PageFooter from '../../../components/Footer/PageFooter'
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