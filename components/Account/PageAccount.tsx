'use client';
import { Icon } from '@iconify/react';
import AccountMenu from './AccountMenu';
import AccordionAddress from '../AccordionAddress/AccordionAddress'
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { useGlobalState } from 'state';
interface PageAccountProps {
  userId: string;
}

const PageAccount = ({ userId }) => {
  const router = useRouter();
  const [drawerState] = useGlobalState("drawer");

  const { data:AccountDetails, loading:AccountLoading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: userId } });
if(AccountLoading) return <Loading/>
  return (
    <div className='body'>
      <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
        <AccountMenu />
      </div>
      <div className='middlecontainer'>
        <div className='ProfileDetails'>
          <div className='AddressList'>
            <div className='LabelHead carouselLabel'>
              <Icon icon="iconamoon:profile-fill" /> Profile Details
            </div>
          </div>

          <div className='AddressDetails'>
            <div>
              <span className='AddressDetails_text'>Name :</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Email :</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Contact :</span>
            </div>
            <div>
              <span className='AddressDetails_text'>Address :</span>
            </div>
          </div>
          {
            AccountDetails?.getAccountDetails_id.filter((idx:any)=>idx.defaultAddress===true).map((item:any,idx:number)=>(
              <div className='AddressDetails' key={idx}>
              <div>
                {item?.fullname}
              </div>
              <div>
              {item?.accountEmail}
              </div>
              <div>
              {item?.contactNo}
              </div>
              <div>
              {item?.Address}
              </div>
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
            {/* <div className='AddressButtonContainer'>
              <button><Icon icon="icon-park-solid:add"/></button>
            </div> */}
          </div>
          <div className='AddressesCollapse'>
            <AccordionAddress address={AccountDetails?.getAccountDetails_id} />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default PageAccount;
