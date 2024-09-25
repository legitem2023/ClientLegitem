import {  useQuery, useSubscription } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { GROUP_SENDER } from 'graphql/queries';
import { ACTIVE_USERS } from 'graphql/subscriptions';
import { setGlobalState, useGlobalState } from 'state';
import PersonalMSGNotification from './PersonalMSGNotification';
import Image from 'next/image';

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
  const deletePersonalMSGCount = (Reciever:any) => {
    setGlobalState("messageCount",[]);
    localStorage.removeItem(`personalMSGCount_${Reciever}`);
  };
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Active Users</li>
    {ActiveUsers.length > 0?ActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.accountEmail)} style={{display:item.accountEmail===email?"none":"block"}}>
        {item.accountEmail}
      </li>
    )):<li>No Available Users</li>}

    <li className='Menu_label'>Conversations</li>
      {Userdata.readGroupSender?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>{drawer(item.Reciever);deletePersonalMSGCount(item.Reciever);}} style={{display:item.Reciever===email?"none":"block",position:"relative"}}>
        <label className='menulabel'>
        <Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46'/%3E%3C/svg%3E" alt={item.Sender} width={20} height={20} />{item.Reciever}
        <PersonalMSGNotification sender={item.Reciever}/>
        </label>
      </li>
    ))}
    </ul> )
}

export default ActiveUsers