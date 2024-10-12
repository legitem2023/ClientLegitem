import React from 'react';
import { Icon } from '@iconify/react';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import Image from 'next/image';
import { formatter, handleError, imageSource } from 'utils/scripts';
import AddCartCmd from 'components/Commands/AddCartCmd';
import AddCartCmdView from 'components/Commands/AddCartCmdView';
import LinkStoreCmd from 'components/Commands/LinkStoreCmd';
import { encode } from 'js-base64';
import Name from './Name';
import Element from './Element';

interface UniversalContainerItemProps {
  item:any;
  title: string;
  thumbnail: string;
  index: number;
}

const UniversalContainerItem_Likes: React.FC<UniversalContainerItemProps> = ({ item, title, thumbnail, index }) => {
  console.log(item.Likes);
  return (
    <div className="UniversalContainerItem">
      <div className="UniversalContainerHead LabelHead">
        <Icon icon="fa6-solid:newspaper" /> {title}
      </div>
      <div className="UniversalThumbnail">
        <Image src={imageSource(item)} onError={handleError} height={100} width={200} alt={`image${index}`} />
      </div>
      <div className='UniversalContainerBody'>
        <Element Label="Name" value={item.name} />
        <Element Label="Price" value={formatter.format(item.price)} />
        <Element Label="Size" value={item.size} />
        <Element Label="Color" value={item.color} />
        <Element Label="Stock" value={item.stock} />
      </div>      
      <div className="UniversalContainerFooter">
      <div className='CommandContainer'>
          <LinkStoreCmd emailAddress={item.agentEmail}/>
          <AddCartCmdView viewedProduct={item} quantity={1} />
      </div>
      </div>
      <div>Date: <TimestampConverter timestamp={item.Likes[0].dateCreated} /></div>
    </div>
  );
};

export default UniversalContainerItem_Likes;
