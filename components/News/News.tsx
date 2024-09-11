import { useQuery } from '@apollo/client'
import { Icon } from '@iconify/react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import { READ_NEWS } from 'graphql/queries'
import Image from 'next/image';
import React from 'react'
import { imageSource } from 'utils/scripts';

const News = () => {
    const {data:News,loading:NewsLoading,error:NewsEror} = useQuery(READ_NEWS);
    if(NewsLoading) return <Loading/>
    if(NewsEror) return "Connection Error";
  return (
    <div className='NewsContainer'>
        {News.readNews.map((item:any,idx:number)=>(
          <div key={idx} className='NewsContainerItem'>
            <div className='NewsContainerHead LabelHead'><Icon icon="fa6-solid:newspaper" />   {item.title}</div>
            <div><Image src={imageSource(item.thumbnail)} height={"100"} width={"200"} alt={"image"+idx}/></div>
            <div>{item.summary}</div>
            <div className='NewsContainerFooter'>Date :<TimestampConverter timestamp={item.dateCreated}/></div>
          </div>
        ))}
    </div>
  )
}

export default News