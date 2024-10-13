import useMessagesNotification from 'components/Hooks/useMessagesNotification';
import { PushNotification } from 'components/Notification/PushNotification';
import React, { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from 'state';

type PropsSender = {
    sender: string;
};

const PersonalMSGNotification: React.FC<PropsSender> = ({ sender }) => {
    const [messageCounts] = useGlobalState("messageCount"); // Global state for message counts per sender
    const { useMessageNotification, loading, error } = useMessagesNotification();
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
    const [lastMessageID, setLastMessageID] = useState<number | null>(null); // Track last message ID

    // Fetch saved count and last message ID from localStorage on initial load
    useEffect(() => {
        if (useMessageNotification && isInitialLoad) {
            const savedCount = localStorage.getItem(`personalMSGCount_${sender}`);
            const savedLastID = localStorage.getItem(`lastMessageID_${sender}`);

            if (savedCount) {
                setGlobalState("messageCount", (prevCounts: any) => ({
                    ...prevCounts,
                    [sender]: JSON.parse(savedCount),
                }));
            }
            if (savedLastID) {
                setLastMessageID(JSON.parse(savedLastID)); // Restore last message ID
            }
            setIsInitialLoad(false); // Mark initial load as complete
        }
    }, [useMessageNotification, isInitialLoad]);

    // Handle new message notifications, but skip on initial load
    useEffect(() => {
        if (useMessageNotification && !isInitialLoad) {
            const MessageData = useMessageNotification.filter((data: any) => data.Sender === sender);

            if (MessageData.length > 0) {
                const latestMessage = MessageData[MessageData.length - 1]; // Get the latest message

                // Check if the latest message ID is different from the lastMessageID
                if (lastMessageID !== latestMessage.id) {
                    PushNotification("Messages", "Personal Messages", latestMessage.Messages);

                    // Update global state message count
                    setGlobalState("messageCount", (prevCounts: any) => ({
                        ...prevCounts,
                        [sender]: (prevCounts[sender] || 0) + MessageData.length,
                    }));

                    // Update localStorage with the new message count and the latest message ID
                    const updatedCount = (messageCounts[sender] || 0) + MessageData.length;
                    localStorage.setItem(`personalMSGCount_${sender}`, JSON.stringify(updatedCount));
                    localStorage.setItem(`lastMessageID_${sender}`, JSON.stringify(latestMessage.id));

                    // Update the last message ID in state
                    setLastMessageID(latestMessage.id);
                }
            }
        }
    }, [sender, useMessageNotification, lastMessageID, messageCounts]);

    const count = messageCounts[sender] || 0; // Get the message count for the specific sender

    if (loading) return null; // Handle loading state
    if (error) return null; // Handle error state

    return count > 0 ? (
        <div className="notificationfmsg">
            {count}
        </div>
    ) : null;
};

export default PersonalMSGNotification;
