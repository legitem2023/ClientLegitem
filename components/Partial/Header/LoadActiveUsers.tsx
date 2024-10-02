"use client"
import { useMutation } from '@apollo/client';
import { SET_ACTIVE_USERS } from 'graphql/mutation';
import React, { useEffect } from 'react'
import { setGlobalState, useGlobalState } from 'state';

const LoadActiveUsers:React.FC = () => {
    const [cookieEmailAddress]:any = useGlobalState("cookieEmailAddress");
    const [insertMessage] = useMutation(SET_ACTIVE_USERS,{
      onCompleted: (data) => {
        if(!data) return
          const distinctData = Array.from(new Set(data?.setActiveUsers?.map((item:any) => item.accountEmail)))
          .map((email:any) => {
            return data?.setActiveUsers.find((item:any) => item.accountEmail === email);
          });
          let storage:any = distinctData?.map((item:any)=>{
            return {"accountEmail":item.accountEmail}
          })

          setGlobalState("cookieArray",storage);
      },
  })
  
  const fetchActiveUsers = () => {
    insertMessage({variables:{emailAddress:cookieEmailAddress}})
    return
  }
  useEffect(() => {
    if (cookieEmailAddress) {
      fetchActiveUsers();
    }
  }, [cookieEmailAddress]); // Only trigger on cookieEmailAddress change
  
  return null
}

export default LoadActiveUsers