import { useMutation } from '@apollo/client';
import { SET_ACTIVE_USERS } from 'graphql/mutation';
import React, { useEffect } from 'react'
import { setGlobalState, useGlobalState } from 'state';

const LoadActiveUsers = () => {
    const [cookieEmailAddress]:any = useGlobalState("cookieEmailAddress");
    const [insertMessage] = useMutation(SET_ACTIVE_USERS,{
      onCompleted: (data) => {
  
        if(!data) return
  
          const distinctData = Array.from(new Set(data?.setActiveUsers?.map(item => item.accountEmail)))
          .map(email => {
            return data?.setActiveUsers.find(item => item.accountEmail === email);
          });
  
          let storage:any = distinctData?.map((item:any)=>{
            return {"accountEmail":item.accountEmail}
          })
  
          setGlobalState("cookieArray",storage);
      },
  })
  
    insertMessage({
            variables:{
                "emailAddress": cookieEmailAddress
    }})        
  return (    
    <div></div>
  )
}

export default LoadActiveUsers