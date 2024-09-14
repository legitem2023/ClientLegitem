import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { SET_ACTIVE_USERS } from 'graphql/mutation';
import { GROUP_SENDER, READ_ACTIVE_USER, READ_PERSONAL_MESSAGES } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = ({email}) => {
  const  { data, loading, error } = useQuery(READ_ACTIVE_USER,{variables:{emailAddress:email}})
  if(loading) return
  if(error) return "Connection Error!";
  const drawer = (data:any) =>{
    setGlobalState("drawer",true);
    setGlobalState("SelectedReciever",data);
  }

  return (
    <ul className='Menu'>
    <li className='Menu_label'>Conversations</li>
      {data?.readActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.accountEmail)} style={{display:item.accountEmail===email?"none":"block"}}>
        {item.accountEmail===email?"Me":item.accountEmail}
      </li>
    ))}
    </ul>  )
}

export default ActiveUsers