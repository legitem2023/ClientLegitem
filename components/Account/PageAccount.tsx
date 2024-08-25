'use client';
import { Icon } from '@iconify/react';
import AccountMenu from './AccountMenu';
import Addresses from './Accordion';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
interface PageAccountProps {
  userId: string;
}

const PageAccount = ({ userId }: PageAccountProps) => {
  const router = useRouter();
  const { data:AccountDetails, loading:AccountLoading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: userId } });

if(AccountLoading) return <Loading/>
  console.log(AccountDetails);
  return (
    <div className='body'>
      <div className='dropdown openDrawer'>
        <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
      </div>
      <div className='LeftWing'>
        <AccountMenu />
      </div>
      <div className='middlecontainer'>
        <div className='ProfileDetails'>
          <div className='AddressList'>
            <div className='LabelHead carouselLabel'>
              <Icon icon="iconamoon:profile-fill" /> Profile Details
            </div>
          </div>
          <div className='AddressImageContainer'>
            <div className='AddressListCoverImage'></div>
          </div>

          <div className='AddressDetails'>
            <div>
              <span className='AddressDetails_text'>Name:</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Email Address:</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Contact Number:</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Default Address:</span>
            </div>
          </div>
          {
            AccountDetails?.getAccountDetails_id.filter((idx:any)=>idx.defaultAddress===true).map((item:any,idx:number)=>(
              <div className='AddressDetails' key={idx}>
              <div><input type='text' className="AddressDetails_text" defaultValue={item?.fullname} /></div>
              <div><input type='text' className="AddressDetails_text" defaultValue={item?.accountEmail} /></div>
              <div><input type='text' className="AddressDetails_text" defaultValue={item?.contactNo} /></div>
              <div><input type='text' className="AddressDetails_text" defaultValue={item?.Address} /></div>
            </div>
            ))
          }

          <div className='AddressButtonContainer'>
            <button><Icon icon="ic:sharp-save" /></button>
          </div>
          <div className='AddressList'>
            <div className='LabelHead carouselLabel'>
              <Icon icon="ph:address-book-fill" /> Addresses
            </div>
            <div className='AddressButtonContainer'>
              <button><Icon icon="icon-park-solid:add"/></button>
            </div>
          </div>
          <div className='AddressesCollapse'>
            <Addresses userId={userId} />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default PageAccount;
