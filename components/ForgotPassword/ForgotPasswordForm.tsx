'use client'
import React, { useEffect, useState } from 'react'
import { useRouter} from 'next/navigation';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from 'graphql/mutation';
import { decode } from 'js-base64';

const ForgotPasswordForm:React.FC = () => {
    const router = useRouter();
    const [useEmail,setEmail] = useState();

    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);
      const dataParam:any = decode(params.get('id'));
      setEmail(dataParam)
    },[])
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [errors, setErrors]:any = useState();
    const [UpdatePassword]:any = useMutation(UPDATE_PASSWORD, {
      onCompleted: (e:string) => {
        console.log(e);
      },
    });
  
    const validateForm = () => {
      if (!formData.email.trim()) return setErrors('Email is required');
      if (!formData.password.trim()) return setErrors('Password is required');
      if (formData.password !== formData.confirmPassword) return setErrors('Passwords do not match');
      
      // Email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) return setErrors('Invalid email format');
    
      // Password strength validation
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordPattern.test(formData.password)) return setErrors('Password must be at least 8 characters long and contain at least one letter and one number');
    
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
        const { data } = await UpdatePassword({
          variables: {"password": formData.password,"emailAddress": formData.email}
        });
        if(data.updatePassword.statusText==="Email already exists"){
          setErrors(data.updatePassword.statusText);
        }else if(data.updatePassword.statusText==="Successfully Saved!"){
          router.push("./Login")
        }else{
          setErrors(data.updatePassword.statusText);
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
            <div className='LabelHead'>Update Password</div>
            <form onSubmit={handleSubmit}>
            <div className='div'>
              <input
                type='email'
                placeholder='Input Email'
                className='emailAddressinput'
                autoComplete='off'
                value={useEmail}
                disabled={true}
                required/>
            </div>
            <div className='div'>
              <input
                type='password'
                placeholder='New Password'
                className='passwordinput'
                autoComplete='off'
                onChange={handleInputChange}
                required/>
            </div>
            <div className='div'>
              <input
                type='password'
                placeholder='Confirm Password'
                className='passwordinput'
                autoComplete='off'
                onChange={handleInputChange}
                required/>
            </div>
            <div className='divButton'>
              <button type='submit'>Submit</button>
              <button type='button' value='Cancel'>Cancel</button>
            </div>
            </form>
          </div>
        </div>
        <div className='RightWing'></div>
    </div>
  )
}

export default ForgotPasswordForm