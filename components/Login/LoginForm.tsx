'use client'
import React, { useState } from 'react'
import { GET_LOGIN } from 'graphql/queries'
import { useRouter } from 'next/navigation';
import client from 'client'
import DataManager from 'utils/DataManager'
import Link from 'next/link';
import { Icon } from '@iconify/react';

const LoginForm = () => {

  const Manager = new DataManager();
  const path = process.env.NEXT_PUBLIC_PATH
  const router = useRouter();
  const [isLoading,setLoading] = useState(false);
  const triggerLogin = async(e:any) => {
    e.target.value='Loading...';
    setLoading(true);
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
    // const errorHandling = document.getElementById("ErrorHandling");
    if (username === "" || username === null) {
      Manager.Warning("Input Username!");
      (document.getElementById("username") as HTMLInputElement).focus();
      setLoading(false);
    } else if (password === "" || password === null) {
      Manager.Warning("Input Password!");
      (document.getElementById("password") as HTMLInputElement).focus();
      setLoading(false);
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
            e.target.value='Login';
            Manager.Success("Welcome !"+username);
            setSharedCookie("clientToken", response.data.getLogin.jsonToken, 1);
            router.push('/Account/');
            setLoading(false);
        }else{
           Manager.Error("Login Failed!");
          (document.getElementById("password") as HTMLInputElement).focus();
          setLoading(false);
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
        <div className='LeftWing'></div>
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
                required/>
            </div>
            <div className='div'>
              <input
                type='password'
                placeholder='Password'
                id='password'
                className='passwordinput'
                autoComplete='off'
                required/>
            </div>
            <div className='div forgot'>
              <Link href='/EmailExistence'>Forgot Password?</Link>
            </div>
            <div className='div forgot'>
              Dont have an account? <Link href='/SignUp'> Sign Up?</Link>
            </div>
            <div className='divButton'>
              {/* <button type='button' value='Login' onClick={triggerLogin}>Login</button> */}
              
              <button type='submit' disabled={isLoading} onClick={triggerLogin}>
              {isLoading?<>Login <Icon icon="eos-icons:loading" /></>:<>Login</>}
              </button>
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