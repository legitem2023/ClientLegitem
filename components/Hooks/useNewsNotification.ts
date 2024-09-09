'use client';

import { useSubscription } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useNotification } from 'components/context/NotificationContext';
import { READ_NEWS } from 'graphql/queries';
import { READ_NEWS_SUBSCRIPTION } from 'graphql/subscriptions';

const NewsNotification = () => {
  const { showNotification } = useNotification();
  
  const [updateNews, setUpdateNewsOrder] = useState<number>(0);

  // Fetch existing news count from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUpdateNewsOrder(parseInt(localStorage.getItem('News') || "0"));
    }
  }, []);

  // Request notification permissions
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Subscribe to the READ_NEWS subscription
  const { data, error } = useSubscription(READ_NEWS_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newsItems = subscriptionData.data?.messageNews;

      if (Array.isArray(newsItems)) {
        newsItems.forEach((newsItem: any) => {
          setUpdateNewsOrder((prevCount) => {
            const newValue = prevCount + 1;
            if (typeof window !== 'undefined') {
              localStorage.setItem('News', newValue.toString());
            }
            // Trigger notification
            showNotification('News', 'A news has arrived.');
            return newValue;
          });
        });
      }
    },
  });

  if (error) {
    console.error('Subscription error:', error);
  }

  return { updateNews };
};

export default NewsNotification;
