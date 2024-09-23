import {  useQuery, useSubscription } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { GROUP_SENDER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions';
import { setGlobalState, useGlobalState } from 'state';

const ActiveUsers = ({email}) => {

  const {data:Userdata,loading:Userloading} = useQuery(GROUP_SENDER,{
    variables:{
      emailAddress:email
    }
  })

  const [ActiveUsers]:any = useGlobalState("cookieArray");
  if(Userloading) return

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

    <li className='Menu_label'>Conversations</li>
      {Userdata.readGroupSender?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.Reciever)} style={{display:item.Reciever===email?"none":"block"}}>
        {item.Reciever}
      </li>
    ))}
    </ul> )
}

export default ActiveUsers