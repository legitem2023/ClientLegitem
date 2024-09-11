import React, { useState } from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import { useGlobalState } from 'state';
import Accordion from 'components/Accordion/Accordion';
import FAQ from 'json/faq.json'
import ContactUs from 'components/ContactUs/ContactUs';
import { useMutation } from '@apollo/client';
import { CONTACT_US } from 'graphql/mutation';
import DataManager from 'utils/DataManager';
const Contact = () => {
    const [drawerState] = useGlobalState("drawer");
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
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <ContactUs handleSubmit={handleSubmit} handleInputChange={handleInputChange} errors={errors}/>
        </div>
        <div>
        </div>
      </div>
    );
}

export default Contact