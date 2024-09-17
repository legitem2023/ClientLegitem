'use client'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
const AccountMenu = () => {
  const router = useRouter();
  return (
    <ul className='Menu'>
    <li className='Menu_label'>Account</li>
    <li onClick={() => router.push('/Account')}><Icon icon="ph:address-book-fill" /> Address Book</li>
    <li onClick={() => router.push('/Order')}><Icon icon="bxs:basket" /> My Orders</li>
    <li onClick={() => router.push('/Return')}><Icon icon="ic:baseline-assignment-return" /> After Service</li>
    <li onClick={() => router.push('/Messages')}><Icon icon="ic:baseline-message" /> Messages</li>
    <li onClick={() => router.push('/Likes')}><Icon icon="mdi:like" /> Likes</li>
    </ul>
    )
}

export default AccountMenu