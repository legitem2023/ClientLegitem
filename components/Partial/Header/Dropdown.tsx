import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'
import { DropdownProps } from 'utils/types/types'

const Dropdown: React.FC<DropdownProps> = ({ path, deletecookies, OrderNotification }) => {
  return (
    <div className='DroppedDown'>
        <ul>
            <li><Link href={path + "Account"} className='DroppedDownAnchor'><Icon icon="ph:address-book-fill" /><span>Address Book</span></Link></li>
            <li><Link href={path + "Order"} className='DroppedDownAnchor'><Icon icon="bxs:basket" /><span>My Orders</span><OrderNotification/></Link></li>
            <li><Link href={path + "Likes"} className='DroppedDownAnchor'><Icon icon="mdi:like" /><span>Likes</span></Link></li>
            <li><Link href={path + "Messages"} className='DroppedDownAnchor'><Icon icon="ic:baseline-message" /><span>Messages</span></Link></li>
            <li><Link href={path + "Account"} onClick={() => deletecookies("clientToken")} className='DroppedDownAnchor'><Icon icon="material-symbols:logout-sharp" /><span>Log out</span></Link></li>
        </ul>
    </div>
  )
}

export default Dropdown