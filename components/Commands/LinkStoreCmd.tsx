import { Icon } from '@iconify/react'
import { encode } from 'js-base64';
import Link from 'next/link'
import React from 'react'

type PropsEmail = {
    emailAddress:string
}
const LinkStoreCmd:React.FC<PropsEmail> = ({emailAddress}) => {
    const path = process.env.NEXT_PUBLIC_PATH || '';
    return (
    <Link  href={path+"Store/"+encode(emailAddress)}>
        <Icon icon='ic:baseline-home' className='LikeStyle'/>
    </Link>
  )
}

export default LinkStoreCmd