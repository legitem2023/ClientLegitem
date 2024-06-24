import { Icon } from '@iconify/react'

const AccountMenu = () => {
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Details</li>
    <li><Icon icon="iconamoon:profile-fill" /> Profile</li>
    <li><Icon icon="bxs:basket" /> My Orders</li>
    <li><Icon icon="ic:baseline-assignment-return" /> After Service</li>
    <li><Icon icon="mdi:like" /> Likes</li>
    </ul>  )
}

export default AccountMenu