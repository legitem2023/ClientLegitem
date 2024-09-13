'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { MESSAGE_ADDED, READ_PERSONAL_MESSAGES,  } from 'graphql/queries'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { setTime } from 'utils/cookie'
import Loading from 'components/Partial/LoadingAnimation/Loading'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { cookies } from 'components/cookies/cookie'
import { useGlobalState } from 'state'
import { POSTPERSONAL_MESSAGES } from 'graphql/mutation'
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions'
const Messages = () => {
    const [cookieEmailAddress]:any = useGlobalState("cookieEmailAddress");
    const { loading, error, data, subscribeToMore } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:cookieEmailAddress}});
    const [insertMessage] = useMutation(POSTPERSONAL_MESSAGES);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        cookies();
        const unsubscribe = subscribeToMore({
            document: PERSONAL_MESSAGES_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.messagesPersonal;
                return {
                    ...prev,
                    personalMessages: [newMessage, ...prev.personalMessages]
                };
            },
        });
        return () => {
            unsubscribe();
        };
    }, [subscribeToMore]);

    if (loading) return <Loading />
    if (error) return <p>{error.message}</p>
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const message = textareaRef.current?.value;
        if (message) {
            await insertMessage({
                variables: {
                    reciever:"Legitem2023@gmail.com",
                    message: message,
                    sender: cookieEmailAddress,
                },
            });
            setIsLoading(false);
            if (textareaRef.current) textareaRef.current.value = '';
        } else {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    }

    

    return (
        <div>
            <ul className='messagesUL'>
                <li className='messagesLI_1'>
                    <div className='Messenger_inputs'>
                        <textarea ref={textareaRef} id='textarea' placeholder="Message"></textarea>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            >
                            {isLoading ? (
                                <Icon icon="eos-icons:loading" />
                            ) : (
                                <Icon icon="material-symbols:send" /> // Original send icon
                            )}
                            </button>
                    </div>
                </li>
            </ul>
            <ul className='messagesUL'>
                {
                    data?.personalMessages.map((item: any, id: any) => (
                        <li key={id} className='messagesLI'>
                            <div>
                                <div>Sender:{item.Sender}</div>
                                <div><Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" alt={item.Sender} width={100} height={100} /></div>
                                <div>{item.Messages}</div>
                                <div className='dateSent'>{setTime(item.dateSent)}</div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Messages