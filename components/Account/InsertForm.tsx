'use client'
import { Icon } from '@iconify/react'
import Input from 'components/UI/Input'
import React, { useState } from 'react'
import { useGlobalState } from 'state' 
import { INSERT_SHIPPING_ADDRESS } from 'graphql/mutation'
import { useMutation } from '@apollo/client'
import DataManager from 'utils/DataManager'
const InsertForm = ({setScale,useScale,refetch}) => {
    const Manager = new DataManager();
    const [isLoading,setLoading] = useState(false);
    const [insertShippingDetails] = useMutation(INSERT_SHIPPING_ADDRESS,{
        onCompleted: (data) => {
          if(data?.insertShippingDetails.statusText === "Successfully Inserted!"){
            Manager.Success(data?.insertShippingDetails.statusText);
            refetch();
            setLoading(false);
            setScale(0);
          }
        }
    });
    const [cookieEmailAddress]: any = useGlobalState("cookieEmailAddress");
    const [cookieActiveUser] = useGlobalState("cookieActiveUser");
    const [useForm,setForm] = useState({
        userId:cookieActiveUser,
        accountEmail:cookieEmailAddress,
        fullname:"",
        contactNo:"",
        Address:"",
      })
    const handleChange = (e:any) =>{
        setForm((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        })
        )
      }

    const handleSubmit = (e:any) => {
      setLoading(true);
        e.preventDefault();
        insertShippingDetails({
            variables: {
                "shippingDetailsInput": useForm
              }
        })
    } 
  return (
    <div className='PopCover' style={{transform:`scale(${useScale})`}}>
            <Icon icon="zondicons:close-solid" 
                  onClick={() => setScale(0)} 
                  style={{color:"red",right:"0px",top:"0px",margin:"10px",height:"30px",width:"30px",position:"absolute"}} />
        <form onSubmit={(e)=>handleSubmit(e)} className='AddressDetails'>
            <div className='LabelHead'>Insert Shipping Details</div>
            <div>
            <Input type={'text'} placeholder={"Input Fullname"} value="" name={"fullname"} func={handleChange}/>
            </div>
            <div>
            <Input type={'number'} placeholder={"Input Contact no."} value="" name={"contactNo"} func={handleChange}/>
            </div>
            <div>
            <Input type={'text'} placeholder={"Input Shipping address"} value="" name={"Address"} func={handleChange}/>
            </div>
            <div>
              <button type='submit' className='universalButtonStyle'>
              {isLoading ? (<> Saving...<Icon icon="eos-icons:loading" /></>) : <>Add</>}  </button>
            </div>
        </form>
    </div>
  )
}

export default InsertForm