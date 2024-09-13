import { useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { READ_ACTIVE_USER, READ_PERSONAL_MESSAGES } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { setGlobalState, useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = () => {
  const [userEmail] = useGlobalState("cookieEmailAddress")
  const { loading, error, data } = useQuery(READ_PERSONAL_MESSAGES,{variables:{emailAddress:userEmail}});
  if(loading) return <Loading />
  if(error) return "Connection Error!";

  const drawer = (data:any) =>{
    setGlobalState("drawer",true);
    setGlobalState("SelectedReciever",data);
  }

  const users = data?.personalMessages

  const distinctData = Array.from(new Set(users.map(item => item.Sender)))
  .map(Sender => {
    return users.find(item => item.Sender === Sender);
  });

  return (
    <ul className='Menu'>
    <li className='Menu_label'>List</li>
      {distinctData?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.Sender)}>
        {item.Sender}
      </li>
    ))}
    </ul>  )
}

export default ActiveUsers