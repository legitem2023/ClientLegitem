import PageHeader from '../../components/Partial/Header/PageHeader'
import PageFooter from '../../components/Partial/Footer/PageFooter'
import PageBody from '../../components/Body/PageBody'
import { useState } from 'react';

export default function Index() {

  return (
    <div className='Main'>
      <PageHeader />
      <PageBody />
      <PageFooter />
    </div>
  )
}
