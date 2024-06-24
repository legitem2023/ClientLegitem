'use client'
import { Icon } from '@iconify/react'
import AccountMenu from './AccountMenu'
import Image from 'next/image'
import Addresses from './Accordion'
import DataManager from 'utils/DataManager'
const PageAccount = (userId:any) => {
  let Manager = new DataManager();
  const {AccountDetails,loading} = Manager.AccountDetails_id(userId.userId);
  if(loading) return
const ActiveAccount = AccountDetails.getAccountDetails_id;
  return (
    <div className='body'>
        <div className='dropdown openDrawer'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>
        <div className='LeftWing'>
          <AccountMenu/>
            {/* <Icon icon="emojione-monotone:up-arrow" className='goUp' onClick={()=>scrollToTop()}/> */}
        </div>
        <div className='middlecontainer'>
          <div className='ProfileDetails'>
            <div className='AddressList'>
              <div className='LabelHead carouselLabel'>
              <Icon icon="iconamoon:profile-fill" /> Profile Details
              </div>
            </div>
            <div className='AddressImageContainer'>
                <div className='AddressListImage'>
                  <Image src="https://192.168.100.86:8080/image/Legitem-svg.svg" 
                        height='200' 
                        width='200' alt='1' className='AddressListImage_image'></Image>
                </div>
                <div className='AddressListCoverImage'>
                </div>
            </div>

            <div className='AddressDetails'>
              <div>
                <span className='AddressDetails_text'> Name :</span>
              </div>
              <div>
              <span className='AddressDetails_text'> Email Address :</span>
              </div>
              <div>
              <span className='AddressDetails_text'> Contact Number :</span>
              </div>
              <div>
              <span className='AddressDetails_text'> Default Address :</span>
              </div>
            </div>
            <div className='AddressDetails'>
                <div><input type='text' className="AddressDetails_text" defaultValue={ActiveAccount[0].fullname}></input></div>
                <div><input type='text' className="AddressDetails_text" defaultValue={ActiveAccount[0].accountEmail}></input></div>
                <div><input type='text' className="AddressDetails_text" defaultValue={ActiveAccount[0].contactNo}></input></div>
                <div><input type='text' className="AddressDetails_text" defaultValue={ActiveAccount[0].Address}></input></div>
            </div>
            <div className='AddressButtonContainer'>
              <button><Icon icon="ic:sharp-save" /></button>
            </div>
            <div className='AddressList'>
              <div className='LabelHead carouselLabel'> 
              <Icon icon="ph:address-book-fill" /> Addresses
              </div>
              <div className='AddressButtonContainer'>
              <button><Icon icon="icon-park-solid:add" /></button>
            </div>
            </div>
              <div className='AddressesCollapse'>
                  <Addresses userId={userId.userId}></Addresses>
              </div>
          </div>
        </div>
        <div className='RightWing'>
          <div className='Banner'></div>
        </div>
    </div>
  )
}

export default PageAccount