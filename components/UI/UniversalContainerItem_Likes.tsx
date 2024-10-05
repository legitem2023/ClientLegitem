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

interface UniversalContainerItemProps {
  item:any;
  title: string;
  thumbnail: string;
  index: number;
}

const UniversalContainerItem_Likes: React.FC<UniversalContainerItemProps> = ({ item, title, thumbnail, index }) => {
  
  return (
    <div className="UniversalContainerItem">
      <div className="UniversalContainerHead LabelHead">
        <Icon icon="fa6-solid:newspaper" /> {title}
      </div>
      <div className="UniversalThumbnail">
        <Image src={imageSource(item)} onError={handleError} height={100} width={200} alt={`image${index}`} />
      </div>
      <div className='UniversalContainerBody'>
        <div>
          Price : {formatter.format(item.price)}
        </div>
        <div>
          Size : {item.size}
        </div>
        <div>
          Stock : {item.stock}
        </div>
        <div className='CommandContainer'>
          <LinkStoreCmd emailAddress={item.agentEmail}/>
          <AddCartCmdView viewedProduct={item} quantity={1} />
        </div>
      </div>      
      <div className="UniversalContainerFooter">
        Date: <TimestampConverter timestamp={item.Likes.dateCreated} />
      </div>
    </div>
  );
};

export default UniversalContainerItem_Likes;
