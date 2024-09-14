import {  useQuery } from '@apollo/client'
import { READ_ACTIVE_USER } from 'graphql/queries';
import { setGlobalState, useGlobalState } from 'state';

const ActiveUsers = ({email}) => {

  const  { data, loading, error } = useQuery(READ_ACTIVE_USER,{variables:{emailAddress:email}})
  console.log(useGlobalState("cookieArray"))
  if(loading) return
  if(error) return "Connection Error!"+error;
  const drawer = (data:any) =>{
    setGlobalState("drawer",true);
    setGlobalState("SelectedReciever",data);
  }
  
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Conversations</li>
      {data?.readActiveUsers.length > 0?data?.readActiveUsers?.map((item: any, index: any) => (
      <li key={index} className='menu_li' onClick={()=>drawer(item.accountEmail)}>
        {item.accountEmail===email?"Me":item.accountEmail}
      </li>
    )):<li>No Available Users</li>}
    </ul> )
}

export default ActiveUsers