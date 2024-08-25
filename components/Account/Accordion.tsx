'use client'
import {Accordion, AccordionItem} from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_DETAILS_ID } from "graphql/queries";
export default function Addresses(userId:any) {    
  const { data:AccountDetails, loading:AccountLoading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: userId.userId } });
  if(AccountLoading) return
  if(error) return
  return (
    <Accordion defaultExpandedKeys={["1"]}>
    {
        AccountDetails.getAccountDetails_id.map((item:any,idx:number)=>(
            <AccordionItem key={idx} aria-label={`Address`+ idx} subtitle="" title={item.Address} className="CollapsibleAddress">
              <textarea className='AddressContent' defaultValue={item.Address} readOnly={true}></textarea>
            </AccordionItem>
        ))
    }
  </Accordion>
  );
}