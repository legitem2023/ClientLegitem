import React, { useEffect, useRef, useState } from 'react'
import { useSubscription } from '@apollo/client';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';

const useMessagesNotification = () => {
    const [useMessageNotification,setMessageNotification] = useState<any>(undefined);
    const { data ,loading,error} = useSubscription(PERSONAL_MESSAGES_ADDED);
    useEffect(() => {
        if(data){
            setMessageNotification(data.messagesPersonal)
        }
    },[data])
  return {
    useMessageNotification,
    loading,
    error
  }
}

export default useMessagesNotification