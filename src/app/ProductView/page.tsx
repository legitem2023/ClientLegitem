"use client"
import { cookies } from 'components/cookies/cookie';
import ProductView from 'components/ProductView/ProductView'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setGlobalState } from 'state';
export default function Index() {
  useEffect(() => {
    cookies();
  }, []);
  return (
    <div className='Main'>
        <ProductView/>
        <ToastContainer/>
    </div>
  )
}
