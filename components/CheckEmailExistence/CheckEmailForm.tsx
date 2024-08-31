'use client'
import React, { useState } from 'react'
import { useRouter,useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATELINK_TO_CHANGE_PASSWORD } from 'graphql/mutation';
import { decode } from 'js-base64';
import DataManager from 'utils/DataManager';
const CheckEmailForm = () => {
    const Manager = new DataManager()
    const path = process.env.NEXT_PUBLIC_PATH || '';
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: ''
    });
    const [errors, setErrors]:any = useState();
    const [create_to_change_password]:any = useMutation(CREATELINK_TO_CHANGE_PASSWORD, {
      onCompleted: (e:string) => {
        console.log(e);
      },
    });
  
    const validateForm = () => {
      if (!formData.email.trim()) return setErrors('Email is required');
      // Email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) return setErrors('Invalid email format');
      // Clear errors if all validations pass
      setErrors('');
      return true;
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      try {
        const { data } = await create_to_change_password({
          variables: {
            "emailAddress": formData.email,
            "path": path
          }});
        if(data.createLinkToChangePassword.statusText==="Email Address Not Exist"){
          setErrors(data.createLinkToChangePassword.statusText);
        }else{
          Manager.Success(data.createLinkToChangePassword.statusText);
        }
      } catch (error) {
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    };
  return (
    <div className='body'>
        <div className='LeftWing'>

        </div>
        <div className='LoginMiddlecontainer'>
          <div className='LoginDiv'>
            <div className='LabelHead'>Create Link In Email Address</div>
            <form onSubmit={handleSubmit}>
            <div className='div'>
              <input
                type='email'
                name='email'
                placeholder='Input Email'
                className='emailAddressinput'
                autoComplete='off'
                onChange={handleInputChange}
                required/>
            </div>
            <div className='divButton'>
              <button type='submit'>Continue</button>
              <button type='button' value='Cancel'>Cancel</button>
            </div>
            </form>
          </div>
        </div>
        <div className='RightWing'></div>
    </div>
  )
}

export default CheckEmailForm