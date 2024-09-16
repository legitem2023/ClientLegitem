import {  useQuery, useSubscription } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions';
import { setGlobalState, useGlobalState } from 'state';

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
    <li className='Menu_label'>Conversations</li>
      {ActiveUsers.length > 0?ActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.accountEmail)}>
        {item.accountEmail}
      </li>
    )):<li>No Available Users</li>}
    </ul> )
}

export default ActiveUsers