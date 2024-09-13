import { useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { READ_ACTIVE_USER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = () => {
  const [userEmail] = useGlobalState("cookieEmailAddress")
  const  { data, loading, error } = useQuery(READ_ACTIVE_USER,{variables:{emailAddress:userEmail}})
  if(loading) return <Loading />
  console.log(data);
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Active</li>
      {data?.readActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li'>
        {item.accountEmail}
      </li>
    ))}
    </ul>  )
}

export default ActiveUsers