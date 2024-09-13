import { useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { GROUP_SENDER, READ_ACTIVE_USER, READ_PERSONAL_MESSAGES } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { setGlobalState, useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = () => {
  const [userEmail] = useGlobalState("cookieEmailAddress")
  const { loading, error, data } = useQuery(GROUP_SENDER,{variables:{emailAddress:userEmail}});
  if(loading) return <Loading />
  if(error) return "Connection Error!";

  const drawer = (data:any) =>{
    setGlobalState("drawer",true);
    setGlobalState("SelectedReciever",data);
  }


  return (
    <ul className='Menu'>
    <li className='Menu_label'>List</li>
      {data?.readGroupSender?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.Sender)}>
        {item.Sender}
      </li>
    ))}
    </ul>  )
}

export default ActiveUsers