'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { READ_PERSONAL_MESSAGES,  } from 'graphql/queries'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setTime } from 'utils/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import { useGlobalState } from 'state'
import { POSTPERSONAL_MESSAGES } from 'graphql/mutation'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
const Messages = ({reciever}) => {
    const [cookieEmailAddress]:any = useGlobalState("cookieEmailAddress");
    const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookieEmailAddress}});
    const [insertMessage] = useMutation(POSTPERSONAL_MESSAGES,{
        onCompleted: (data) => {
            textareaRef.current.value = '';
            setIsLoading(false);
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [SelectedReciever] = useGlobalState("SelectedReciever");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentDay, setCurrentDay] = useState(new Date()); // Track current day
    useEffect(() => {
        const unsubscribe = subscribeToMore({
          document: PERSONAL_MESSAGES_ADDED,
          variables: { emailAddress: cookieEmailAddress, reciever: reciever }, // Pass any necessary variables
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData?.data) return;
            const newMessages = subscriptionData?.data?.messagesPersonal;
            // Filter messages for the correct sender/receiver pair
            const filteredNewMessages = newMessages?.filter(
              (item: any) => (item.Sender === reciever || item.Sender === cookieEmailAddress) &&
                             (item.Reciever === cookieEmailAddress || item.Reciever === reciever)
            );
      
            if (!filteredNewMessages || filteredNewMessages.length === 0) return prev;
            // Filter out any duplicates based on a unique identifier (assuming message.id exists)
            const uniqueNewMessages = filteredNewMessages.filter(
              (newMsg: any) => !prev.personalMessages.some((prevMsg: any) => prevMsg.id === newMsg.id)
            );
            
            // Add new messages to the end of the list
            if (uniqueNewMessages.length === 0) return prev;
            return {
              ...prev,
              personalMessages: [
                ...uniqueNewMessages, // Add only unique new messages
                ...prev.personalMessages
              ]
            };
          },
        });
      
        return () => {
          unsubscribe();
        };
      }, [subscribeToMore, cookieEmailAddress, reciever]);
      
// Add necessary dependencies
//########################## MUTATION PART START ##########################
    const FilterReciever = data?.personalMessages.filter((item: any) => (item.Sender===reciever || item.Sender === cookieEmailAddress) && (item.Reciever===cookieEmailAddress || item.Reciever === reciever))
        const filteredPosts = FilterReciever.filter((post: any) => {
      const postDate = new Date(parseInt(post.dateSent)); // Convert timestamp to date
      return (
        postDate.toDateString() === currentDay.toDateString()
      );
    });

  const goToPreviousDay = () => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() - 1);
    setCurrentDay(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() + 1);
    setCurrentDay(newDate);
  };

  const JumpToDate = (date: any) => {
    setCurrentDay(date);
  }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const message = textareaRef.current?.value;
        if (message) {
            await insertMessage({
                variables: {
                    reciever:SelectedReciever,
                    message: message,
                    sender: cookieEmailAddress,
                },
            });
        } else {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    }
    if (loading) return <Loading />
    if (error) return <p>{error.message}</p>
//########################## MUTATION PART END ##########################
    return (
        <div>
            <ul className='messagesUL keep_on_top'>
                <li className='messagesLI_1'>
                    <div className='Messenger_inputs'>
                        <textarea ref={textareaRef} id='textarea' placeholder="Message"></textarea>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='universalButtonStyle'
                            >
                            {isLoading ? (
                                <Icon icon="eos-icons:loading" />
                            ) : (
                                <Icon icon="material-symbols:send" /> // Original send icon
                            )}
                            </button>
                            <span style={{marginTop:"10px"}}>
                            Look for a specific Date <input type='date' onChange={(e) => JumpToDate(new Date(e.target.value))}/>
                            </span>

                    </div>
                </li>
            </ul>
            <ul className='messagesUL'>
                {
                  filteredPosts.map((item: any, id: any) => (
                        <li key={id} className={item.Sender===cookieEmailAddress?"messagesLI_me":"messagesLI"}>
                            <div>
                                <div>Sender: {item.Sender===cookieEmailAddress?"Me":item.Sender}</div>
                                <div><Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" alt={item.Sender} width={100} height={100} /></div>
                                <div>{item.Messages}</div>
                                <div className='dateSent'>{setTime(item.dateSent)}</div>
                            </div>
                        </li>
                ))}
        <li className='messages_pagination'>
          <button className='universalButtonStyle' onClick={goToPreviousDay}>Previous Day</button>
          <button className='universalButtonStyle' onClick={goToNextDay}>Next Day</button>
        </li>
            </ul>
        </div>
    )
}

export default Messages