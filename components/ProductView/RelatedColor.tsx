import React from 'react'
import { GET_CHILD_INVENTORY_RELATED_COLOR_SIZE } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import { i } from 'vitest/dist/reporters-yx5ZTtEV'
import { imageSourceGallery } from 'utils/scripts'
import Image from 'next/image'
import Link from 'next/link'
const RelatedColor = ({styleCode}) => {
    const {data,loading,error} = useQuery(GET_CHILD_INVENTORY_RELATED_COLOR_SIZE,{
        variables:{
            styleCode:styleCode
        }
    })
    const path = process.env.NEXT_PUBLIC_PATH;

    if(loading) return;
    if(error) return

    return (
    <div className='colorSelection'>{
        data.getChildInventory_details.map((item:any)=>(
            <div key={item.id}>
            <Link href={`${path}Products/${item.id}`}>
                <Image src={imageSourceGallery(item)} height='50' width='50' alt={item.id} />
                {item.color}
            </Link>
            </div>
        ))
    }</div>
  )
}

export default RelatedColor