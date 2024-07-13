import React from 'react'
import RealState from 'components/RealState/RealState'
import PageHeader from '../../../components/Header/PageHeader'
import PageFooter from '../../../components/Footer/PageFooter'

const page = () => {
  return (
    // <div></div>
    <div className='Main'>
      <PageHeader />
      <RealState />
      <PageFooter />
    </div>
  )
}
export default page


