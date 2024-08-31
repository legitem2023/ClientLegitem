'use client'

import React from 'react'
import { Icon } from '@iconify/react'

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: string;
}

const ContactUs: React.FC<Props> = ({ handleSubmit, handleInputChange,errors }) => {
  return (
    <div>
      <div className='LabelHead carouselLabel'>
        <Icon icon="ic:baseline-phone" />
        <span>Contact Us</span>
      </div>
      <form onSubmit={handleSubmit}>
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
            <button type="submit">Apply</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactUs
