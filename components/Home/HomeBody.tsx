'use client'
import { Icon } from '@iconify/react'
import { Gallery } from 'components/Gallery/Gallery'
import Menu from 'components/Partial/Menu'
import React, { useState } from 'react'
import ThreeJS from 'components/Partial/ThreeJS/ThreeJS'
import { Input } from '@nextui-org/react'
import { HomeGallery } from 'components/Gallery/HomeGallery'
import Accordion from 'components/Accordion/Accordion'
import FAQ from 'json/faq.json'
import About from 'components/About/About'
import Disclaimer from 'components/About/Disclaimer'
import Privacy from 'components/About/Privacy'
import { CONTACT_US } from 'graphql/mutation'
import { useMutation } from '@apollo/client'
import DataManager from 'utils/DataManager';
import ContactUs from 'components/ContactUs/ContactUs'
import { ToastContainer } from 'react-toastify'
const HomeBody = () => {
  const Manager = new DataManager();
  const [errors, setErrors]:any = useState();
  const [formData, setFormData] = useState({
    emailAddress: '',
    fullname:'',
    contactNo:'',
    details:''
  });
const [contact_us] = useMutation(CONTACT_US,{
  onCompleted: (e:any) => {
    console.log(e.contactUs);
    if(e.contactUs.statusText==="Successfully"){
      Manager.Success(e.contactUs.statusText);
    }else{
      Manager.Error(e.contactUs.statusText);
    }
  },
})
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const validateForm = () => {
  if (!formData.fullname.trim()) return setErrors('Full Name is required');
  if (!formData.contactNo.trim()) return setErrors('Contact No. is required');
  if (!formData.emailAddress.trim()) return setErrors('Email is required');
  if (!formData.details.trim()) return setErrors('datails is required');
  
  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.emailAddress)) return setErrors('Invalid email format');

  // Clear errors if all validations pass
  setErrors('');
  return true;
};

const handleSubmit = async (e:any) => {
  e.preventDefault();
  if (!validateForm()) return;
  try {
    await contact_us({
      variables: {
        "messagebody": {
          "contactNo": formData.contactNo,
          "details": formData.details,
          "emailAddress": formData.emailAddress,
          "fullname": formData.fullname
        }
      }});
  } catch (error) {
    
  }
}
  return (
    <div className='body'>
      <div className='LeftWing'>
        <Menu />
      </div>
      <div className='middlecontainer'>
        <div className=''></div>
        <div className=''>
          <div className=''>
              {/* <HomeGallery/> */}
              <About/>
              <Disclaimer/>
              <Accordion faqs={FAQ}></Accordion>
              <Privacy/>
              <ContactUs handleSubmit={handleSubmit} handleInputChange={handleInputChange} errors={errors}/>
              <ToastContainer/>
          </div>
        </div>
      </div>
      <div className='RightWing'>

      </div>
    </div>
  )
}

export default HomeBody