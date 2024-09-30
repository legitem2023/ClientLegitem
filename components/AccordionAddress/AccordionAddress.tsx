import React from 'react';
import { useState } from 'react';
import { SET_DEFAULT_ADDRESS,DELETE_SHIPPING_ADDRESS } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import DataManager from 'utils/DataManager';
import { Icon } from '@iconify/react';

const AccordionAddress = ({ address,refetch }) => {
    const Manager = new DataManager();

    const [activeIndex, setActiveIndex] = useState(null);
    const [deleteAddress] = useMutation(DELETE_SHIPPING_ADDRESS,{
        onCompleted:data =>{
            Manager.Success("Successfully Deleted!");
            refetch();
        }
    })
    const [setDefaultAddress] = useMutation(SET_DEFAULT_ADDRESS,{
        onCompleted:data =>{
            if(data.updateDefaultAddress.statusText ==='Successfully Updated!'){
                Manager.Success("Successfully Updated!");
                refetch();
            }
        }
    })
    const toggleAccordion = (index:any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };

    const handleUpdate = (e:any) =>{
        setDefaultAddress({
            variables:{
                updateDefaultAddressId:parseInt(e.target.getAttribute("aria-current")),
                accountEmail:e.target.getAttribute("aria-details")
            }
        })
    }

    const handleDelete = (id:any) =>{
        const conf = confirm("Are you sure you want to delete this address?");
        if(conf){
            deleteAddress({
                variables:{
                    deleteShippingDetailsId:id
                }
            })            
        }
    }

    return (
        <div className="faq-accordion">
            {address.map((add:any, index:number) => (
                <div className="faq-item" key={index}>
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                        {add.Address}
                        <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                    </div>
                    {activeIndex === index && (
                        <div className="faq-answer">
                            <div style={{position:"relative"}}>
                            {
                                add.defaultAddress===false?(<button onClick={(e)=>handleUpdate(e)} 
                                                                    className='universalActiveButton'
                                                                    aria-label={add.contactNo}
                                                                    aria-description={add.Address}
                                                                    aria-current={add.id} 
                                                                    aria-details={add.accountEmail}>Set Default</button>)
                                                            :(<button className='universalINActiveButton'>Default Address</button>)
                            }
                            {add.defaultAddress===false?(<Icon icon="zondicons:close-solid" 
                            onClick={() => handleDelete(add.id)} 
                            style={{color:"red",right:"0px",top:"0px",margin:"10px",height:"30px",width:"30px",position:"absolute"}} />):""}
                            </div>
                            <p>{add.fullname}</p>
                            <p>{add.contactNo}</p>
                            <p>{add.Address}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AccordionAddress;
