'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
// import AccountMenu from 'components/Account/AccountMenu'
// import transactionData from '../../json/transactionStages_client.json'
// import Link from 'next/link'
// import Image from 'next/image'
import { GET_LOGIN } from 'graphql/queries'
import { useRouter } from 'next/navigation';
import client from 'client'
import DataManager from 'utils/DataManager'
// import { ToastContainer } from 'react-toastify'

const LoginForm = () => {

  const Manager = new DataManager();
  const path = process.env.NEXT_PUBLIC_PATH
  const router = useRouter();
  const triggerLogin = async(e:any) => {
    e.preventDefault(); // Prevent default form submission behavior
    const username:any = (document.getElementById("username") as HTMLInputElement).value;
    const password:any = (document.getElementById("password") as HTMLInputElement).value;
    const response:any = await client.query({
        query: GET_LOGIN,
        variables:{
          "username": username,
          "password": password
      }   
    })
    const errorHandling = document.getElementById("ErrorHandling");
    if (username === "" || username === null) {
      Manager.Warning("Input Username!");
      (document.getElementById("username") as HTMLInputElement).focus();
    } else if (password === "" || password === null) {
      Manager.Warning("Input Password!");
      (document.getElementById("password") as HTMLInputElement).focus();
    } else {
        if(response?.data?.getLogin?.statusText==="Welcome!"){
            const setSharedCookie = (name: string, value: string, daysToExpire: any) => {
                const expiration = new Date();
                expiration.setDate(expiration.getDate() + daysToExpire);
                const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) +
                    '; expires=' + expiration.toUTCString() +
                    '; secure;' +
                    '; path=/';
                document.cookie = cookieValue;
            }
            Manager.Success("Welcome !"+username);
            setSharedCookie("token", response.data.getLogin.jsonToken, 1);
            router.push('/Account/');
        }else{
           Manager.Error("Login Failed!");
          (document.getElementById("password") as HTMLInputElement).focus();
        }

    }
  };
const triggerCancel = () =>{
    (document.getElementById("username") as HTMLInputElement).value="";
    (document.getElementById("password") as HTMLInputElement).value="";
    (document.getElementById("ErrorHandling") as HTMLDivElement).innerHTML="";
    (document.getElementById("username") as HTMLInputElement).focus();
}
  return (
    <div className='body'>
        <div className='dropdown openDrawer'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>
        <div className='LeftWing'>

        </div>
        <div className='LoginMiddlecontainer'>
          <div className='LoginDiv'>
            <div className='LabelHead'>Login</div>
            <div className='div'>
              <input
                type='email'
                placeholder='Input Email'
                id='username'
                className='usernameinput'
                autoComplete='off'
                required
              />
            </div>
            <div className='div'>
              <input
                type='password'
                placeholder='Password'
                id='password'
                className='passwordinput'
                autoComplete='off'
                required
              />
            </div>
            <div className='divButton'>
              <button type='button' value='Login' onClick={triggerLogin}>Login</button>
              <button type='button' value='Cancel' onClick={triggerCancel}>Cancel</button>

              </div>
          </div>
        </div>
        <div className='RightWing'>
          {/* <div className='Banner'></div> */}
        </div>
    </div>
  )
}

export default LoginForm