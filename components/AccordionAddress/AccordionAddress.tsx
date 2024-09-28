import React from 'react';
import { useState } from 'react';
import { SET_DEFAULT_ADDRESS } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import DataManager from 'utils/DataManager';

const AccordionAddress = ({ address,refetch }) => {
    const Manager = new DataManager();

    const [activeIndex, setActiveIndex] = useState(null);
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
                            {
                                add.defaultAddress===false?(<button onClick={(e)=>handleUpdate(e)} 
                                                                    className='universalActiveButton'
                                                                    aria-label={add.contactNo}
                                                                    aria-description={add.Address}
                                                                    aria-current={add.id} 
                                                                    aria-details={add.accountEmail}>Set Default</button>)
                                                            :(<button className='universalINActiveButton'>Default Address</button>)
                            }
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
