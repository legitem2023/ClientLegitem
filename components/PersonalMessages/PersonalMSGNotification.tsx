import { useSubscription } from '@apollo/client';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';
import React, { useState, useEffect, useRef } from 'react';
import { useGlobalState } from 'state';

const PersonalMSGNotification = ({ sender }: { sender: string }) => {
    const [userEmail] = useGlobalState("cookieEmailAddress");
    const [tempCount, setTempCount] = useState<number>(0);
    const subscriptionRef = useRef<any>(null);

    useSubscription(PERSONAL_MESSAGES_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(subscriptionData.data?.messagesPersonal)
            if (subscriptionData.data?.messagesPersonal) {    
                const filteredBySender = subscriptionData.data.messagesPersonal.filter((data: any) =>
                    data.Receiver === userEmail && data.Sender === sender
                );
                setTempCount(filteredBySender.length);
            }
        },
        onSubscriptionComplete: () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        },
    });

    useEffect(() => {
        return () => {
            // Unsubscribe on component unmount
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, []);

    return (
        <div style={{
            display: tempCount < 1 ? "none" : "flex",
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
            {tempCount}
        </div>
    );
};

export default PersonalMSGNotification;
