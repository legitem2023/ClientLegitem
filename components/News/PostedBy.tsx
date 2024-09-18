import React from 'react'
import { NEWS_POSTER } from 'graphql/queries'
import { useQuery } from '@apollo/client'
import Loading from 'components/Partial/LoadingAnimation/Loading'
const PostedBy = () => {
    const {data,loading,error} = useQuery(NEWS_POSTER)
  if(loading) return <Loading/>
    return (
        <ul className='Menu'>
        <li className='Menu_label'>Posted By</li>
          {data.readNewsPoster?.map((item: any, index: any) => (
          <li key={index} className='menu_li'>
            {item.postedBy}
          </li>
        ))}
        </ul> )
}

export default PostedBy