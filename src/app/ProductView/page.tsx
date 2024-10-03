"use client"
import { cookies } from 'components/cookies/cookie';
import ProductView from 'components/ProductView/ProductView'
import { useEffect } from 'react';
export default function Index() {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
        <ProductView/>
    </div>
  )
}
