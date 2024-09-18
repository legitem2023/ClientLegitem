'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const ContactUs: React.FC<Props> = ({ handleSubmit, handleInputChange, errors, setLoading,isLoading }) => {

  return (
    <div>
      <div className='LabelHead carouselLabel'>
        <Icon icon="ic:baseline-phone" />
        <span>Contact Us</span>
      </div>
      <form onSubmit={(e)=>{handleSubmit(e);setLoading(true)}}>
        <div className='ContactForm'>
          <div>
            <input
              type='text'
              name="fullname"
              onChange={handleInputChange}
              placeholder='Enter Name'
            />
          </div>
          <div>
            <input
              type='text'
              name="emailAddress"
              onChange={handleInputChange}
              placeholder='Enter Email'
            />
          </div>
          <div>
            <input
              type='text'
              name="contactNo"
              onChange={handleInputChange}
              placeholder='Enter Mobile'
            />
          </div>
          <div>
            <textarea
              name="details"
              placeholder='Enter Description'
              onChange={handleInputChange}
            />
          </div>
          <div>{errors}</div>
          <div>
            <button type="submit">{
              isLoading ? <Icon icon="eos-icons:loading" /> : "Submit"  
            }</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactUs
