import { useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import PostPagination from 'components/Partial/PostPagination/PostPagination';
import { READ_ACTIVE_USER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { useEffect } from 'react';
import { useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = () => {
  const [userEmail] = useGlobalState("cookieEmailAddress")
  const  { data, loading, error,subscribeToMore } = useQuery(READ_ACTIVE_USER,{variables:{emailAddress:userEmail}})
  useEffect(() => {
    const unsubscribe = subscribeToMore({
        document: ACTIVE_USERS,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.ActiveUserList;
            return Object.assign({}, prev, {
                messages: [newMessage, ...(prev?.messages || [])]
            });
        },
    });
    return () => {
        unsubscribe();
    };
}, [subscribeToMore]);
  if(loading) return <Loading />
  if(error) "Connection Error";
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Active</li>
      {data?.readActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li'>
        {item.accountEmail}
      </li>
    ))}
    </ul>)
}

export default ActiveUsers