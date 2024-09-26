import { useSubscription } from '@apollo/client';
import { PERSONAL_MESSAGES_ADDED } from 'graphql/subscriptions';
import React, { useEffect, useRef } from 'react';
import { setGlobalState, useGlobalState } from 'state';

const PersonalMSGNotification = ({ sender }: { sender: string }) => {
    const [messageCounts] = useGlobalState("messageCount"); // Global state for message counts per sender
    const isInitialLoad = useRef(true); // Track initial load state

    useSubscription(PERSONAL_MESSAGES_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const newMessages = subscriptionData.data?.messagesPersonal || [];
            const filteredBySender = newMessages.filter((data: any) => data.Sender === sender);

            if (filteredBySender.length > 0 && !isInitialLoad.current) {
                // Update message count in global state
                setGlobalState("messageCount", (prevCounts: any) => ({
                    ...prevCounts,
                    [sender]: (prevCounts[sender] || 0) + filteredBySender.length,
                }));

                // Persist updated count to localStorage
                const updatedCount = (messageCounts[sender] || 0) + filteredBySender.length;
                localStorage.setItem(`personalMSGCount_${sender}`, JSON.stringify(updatedCount));
            }
        },
    });

    useEffect(() => {
        // Load the initial count from localStorage when component mounts
        const savedCount = localStorage.getItem(`personalMSGCount_${sender}`);
        if (savedCount) {
            setGlobalState("messageCount", (prevCounts: any) => ({
                ...prevCounts,
                [sender]: JSON.parse(savedCount),
            }));
        }

        isInitialLoad.current = false; // Mark as no longer the initial load
    }, [sender]);

    const count = messageCounts[sender] || 0; // Get the message count for the specific sender

    return count > 0 ? (
        <div className="notificationfmsg">
            {count}
        </div>
    ) : null;
};



export default PersonalMSGNotification;
