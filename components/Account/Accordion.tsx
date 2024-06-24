// import React from "react";

import {Accordion, AccordionItem} from "@nextui-org/react";
import DataManager from '../../utils/DataManager'
export default function Addresses(userId:any) {    
  let Manager = new DataManager();
  const {AccountDetails,loading,error} = Manager.AccountDetails_id(userId.userId);
  if(loading) return
  if(error) return
  console.log(userId)

  const AddressBook = AccountDetails.getAccountDetails_id;


  return (
    <Accordion defaultExpandedKeys={["1"]}>
    {           
        AddressBook.map((item:any,idx:number)=>(
            <AccordionItem key={idx} aria-label={`Address`+ idx} subtitle="" title={item.Address} className="CollapsibleAddress">
              <textarea className='AddressContent' defaultValue={item.Address} readOnly={true}></textarea>
            </AccordionItem>
        ))
    }
  </Accordion>

  );




}