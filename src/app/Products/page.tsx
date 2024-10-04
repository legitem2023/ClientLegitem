'use client'
import PageHeader from '../../../components/Partial/Header/PageHeader' 
import PageFooter from '../../../components/Partial/Footer/PageFooter'
import ProductsBody from '../../../components/Products/ProductsBody'
import { useEffect } from 'react';
import { cookies } from 'components/cookies/cookie';

export default function Index() {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
      <PageHeader/>
        <ProductsBody/>
      <PageFooter/>
    </div>
  )
}
