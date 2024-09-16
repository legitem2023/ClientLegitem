import { useQuery, useSubscription } from '@apollo/client'
import { Icon } from '@iconify/react'
import Loading from 'components/Partial/LoadingAnimation/Loading';
import PostPagination from 'components/Partial/PostPagination/PostPagination';
import { READ_ACTIVE_USER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions'
import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from 'state';
import { limitText } from 'utils/scripts';

const ActiveUsers = ({email}) => {
  const {data,loading} = useSubscription(ACTIVE_USERS)
  const [ActiveUsers]:any = useGlobalState("cookieArray");
  if(loading) return
  if(ActiveUsers===undefined) return
  const drawer = (data:any) =>{
    setGlobalState("drawer",true);
    setGlobalState("SelectedReciever",data);
  }
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Active Users</li>
      {ActiveUsers.length > 0?ActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.accountEmail)}>
        {item.accountEmail}
      </li>
    )):<li>No Available Users</li>}
    </ul> )
}

export default ActiveUsers