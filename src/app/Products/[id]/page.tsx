"use client"
import { cookies } from 'components/cookies/cookie';
import PageFooter from 'components/Partial/Footer/PageFooter';
import PageHeader from 'components/Partial/Header/PageHeader';
import ProductView from 'components/ProductView/ProductView'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
  useEffect(() => {
    cookies();
  }, [cookies]);
  return (
    <div className='Main'>
        <PageHeader/>
        <ProductView/>
        <ToastContainer/>
        <PageFooter/>
    </div>
  )
}
