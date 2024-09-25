import { useSubscription } from '@apollo/client';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';
import React, { useState, useEffect, useRef } from 'react';
import { setGlobalState, useGlobalState } from 'state';

const PersonalMSGNotification = ({ sender }: { sender: string }) => {
    const [userEmail] = useGlobalState("cookieEmailAddress");
    const subscriptionRef = useRef<any>(null);
    const [messageCount] = useGlobalState("messageCount");
    useSubscription(PERSONAL_MESSAGES_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const newMessages = subscriptionData.data?.messagesPersonal || [];
            const filteredBySender = newMessages.filter((data: any) => data.Reciever === sender);
            console.log("INitial",filteredBySender.length)
            if (filteredBySender.length > 0) {
                setGlobalState("messageCount",prevCount => prevCount + filteredBySender.length);
                localStorage.setItem("personalMSGCount", JSON.stringify(messageCount + filteredBySender.length));
            }
        },
        onSubscriptionComplete: () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        },
    });

    useEffect(() => {
        // Load the initial count from localStorage when component mounts
        const savedCount = localStorage.getItem("personalMSGCount");
        if (savedCount) {
          setGlobalState("messageCount",JSON.parse(savedCount));
        }

        return () => {
            // Unsubscribe on component unmount
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, []);

    return (
        <div style={{
            display: messageCount < 1 ? "none" : "flex",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
            position: "absolute",
            top: "0px",
            right: "0px"
        }}>
            {messageCount}
        </div>
    );
};

export default PersonalMSGNotification;
