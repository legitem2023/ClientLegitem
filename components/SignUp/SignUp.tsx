'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { INSERT_SIGNUP } from '../../graphql/mutation'
import Link from 'next/link';
import { Icon } from '@iconify/react';

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    contactNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors]:any = useState();
  const [signUp]:any = useMutation(INSERT_SIGNUP, {
    onCompleted: (e:string) => {
      console.log(e);
    },
  });

  const validateForm = () => {
    if (!formData.fullname.trim()) return setErrors('Full Name is required');
    if (!formData.contactNo.trim()) return setErrors('Contact No. is required');
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
      setLoading(true);
      const { data } = await signUp({
        variables: {
            "signUpParameters": [
              {
                "PassWord": formData.password,
                "contactNo": formData.contactNo,
                "emailAddress": formData.email,
                "fullname": formData.fullname
              }
            ]
          },
      });
      if(data.insertSignUp.statusText==="Email already exists"){
        setErrors(data.insertSignUp.statusText);
        setLoading(false);
      }else if(data.insertSignUp.statusText==="Successfully Saved!"){
        setLoading(false);
        router.push("./Login");
      }else{
        setErrors(data.insertSignUp.statusText);
      }
    } catch (error) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className='body'>
      <div className='LeftWing'></div>
      <div className='LoginMiddlecontainer'>
        <div className='SignupDiv'>
          <div className='LabelHead'>Sign Up</div>
          <form onSubmit={handleSubmit}>
            <div className='div'>
              <input
                type='text'
                name='fullname'
                placeholder='Input Fullname'
                className='usernameinput'
                autoComplete='off'
                onChange={handleInputChange}
                required
              />
             
            </div>
            <div className='div'>
              <input
                type='text'
                name='contactNo'
                placeholder='Input Contact No'
                className='contactinput'
                autoComplete='off'
                onChange={handleInputChange}
                required
              />
             
            </div>
            <div className='div'>
              <input
                type='email'
                name='email'
                placeholder='Input Email Address'
                className='emailAddressinput'
                autoComplete='off'
                onChange={handleInputChange}
                required
              />
             
            </div>
            <div className='div'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='passwordinput'
                autoComplete='off'
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='div'>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='passwordinput'
                autoComplete='off'
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='div forgot'>
              Already a member? <Link href='/Login'>Login</Link>
            </div>
            <div className='div errorHandler'>
              {errors}
            </div>

            <div className='divButton'>
              <button type='submit' disabled={isLoading}>
              {isLoading?<>Sign Up <Icon icon="eos-icons:loading" /></>:<>Sign Up</>}
              </button>
              <button type='button' onClick={() => router.push('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div className='RightWing'></div>
    </div>
  );
};

export default SignUpForm;
