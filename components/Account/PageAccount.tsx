'use client';
import { Icon } from '@iconify/react';
import AccountMenu from './AccountMenu';
import AccordionAddress from '../AccordionAddress/AccordionAddress'
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { useGlobalState } from 'state';
import { useState } from 'react';
import InsertForm from './InsertForm';
import Element from 'components/UI/Element';
interface PageAccountProps {
  userId: string;
}

const PageAccount:React.FC<PageAccountProps> = ({ userId }) => {
  const [useScale,setScale] = useState(0);
  const [drawerState] = useGlobalState("drawer");
  const { data:AccountDetails, loading:AccountLoading, error:AccountError,refetch:AccountRefetch } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: userId } });
if(AccountLoading) return <Loading/>
if(AccountError) return "Connection Error";
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <AccountMenu />
      </div>
      <div className='middlecontainer'>
        <InsertForm setScale={setScale} useScale={useScale} refetch={AccountRefetch}/>
        <div className='ProfileDetails'>
          <div className='AddressList'>
            <div className='LabelHead carouselLabel'>
              <Icon icon="iconamoon:profile-fill" /> Profile Details
            </div>
          </div>
          {
            AccountDetails?.getAccountDetails_id.filter((idx:any)=>idx.defaultAddress===true).map((item:any,idx:number)=>(
              <div className='AddressDetails' key={idx}>
                <Element Label="Name" value={item?.fullname} />
                <Element Label="Email" value={item?.accountEmail} />
                <Element Label="Contact" value={item?.contactNo} />
                <Element Label="Address" value={item?.Address} />
              </div>
            ))
          }
          <div className='AddressList'>
            <div className='LabelHead carouselLabel'>
              <Icon icon="ph:address-book-fill" /> Addresses
            </div>
            <div className='AddressButtonContainer'>
            <button onClick={()=>setScale(1)}><Icon icon="mingcute:add-fill"/></button>
            </div>
          </div>
          <div className='AddressesCollapse'>
            <AccordionAddress address={AccountDetails?.getAccountDetails_id} refetch={AccountRefetch}/>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default PageAccount;
