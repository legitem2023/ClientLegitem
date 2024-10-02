import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import UniversalContainerItem from 'components/UI/UniversalContainerItem';
import UniversalContainerItem_Likes from 'components/UI/UniversalContainerItem_Likes';
import { READ_LIKES } from 'graphql/queries';
import React from 'react'
import { useGlobalState } from 'state';
import { imageSource } from 'utils/scripts';

const LikesData = () => {
  const path = process.env.NEXT_PUBLIC_PATH
  const [cookieEmailAddress] = useGlobalState("cookieEmailAddress");
  const {data:LikeData,loading:LikeLoading,error:LikeError} = useQuery(READ_LIKES,{
    variables:{
      accountEmail:cookieEmailAddress
    }
  });
  if(LikeLoading) return <Loading/> 
  if(LikeError) return

  return (
    <div className='NewsContainer'>
      {/* { <UniversalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />} */}
      {LikeData.readLikes.length > 0?LikeData.readLikes?.map((item: any, idx: number) => (
        <UniversalContainerItem_Likes key={idx} 
                                      item={item} 
                                      title={item.productCode} 
                                      thumbnail={imageSource(item.thumbnail)}  
                                      index={idx}/>
      )):(<h1>No Data</h1>)}
    </div>
  )
}

export default LikesData