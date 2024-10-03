import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings'; // Assume you have a Ratings component
import { formatter, imageSource } from 'utils/scripts'; // Assuming you have utilities for formatting and image source

interface ThumbnailProps {
  item: any;
  path: string;
  handleLoading: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // Updated to accept the event
  HandleAddtoCartThumbs: (item: any) => void;
  HandleAddtoLikelistThumbs: (item: any) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ 
  item, 
  path, 
  handleLoading, 
  handleError, 
  HandleAddtoCartThumbs,
  HandleAddtoLikelistThumbs
}) => {

  return (
    <div className="thumbnail">
      <div className="thumbnailImageContainer">
        <Icon 
          onClick={() => HandleAddtoLikelistThumbs(item.productCode)}
          icon="mdi:like"  
          className='LikeStyle'
        />
        <Link href={`${path}Products/${item.id}`}>
          <Image
            src={imageSource(item)}
            height="156"
            width="200"
            quality={1}
            alt={item.id}
            onClick={handleLoading}
            onError={handleError}
            className="thumbnailImage"
          />
        </Link>
      </div>
      <div className="thumbnailTextContainer">
        <div>
          <span>Price :</span>
          <span>{formatter.format(item.price)}</span>
        </div>
        <div className="prodName">
          <span>Name :</span>
          <span className="span">{item.name ? item.name : 'Untitled'}</span>
        </div>
        <div className="prodName">
          <span>Sold :</span>
          <span className="span">{item.Stock ? item.Stock : 'No Stock'}</span>
        </div>
        <div className="ViewsLikes">
          <span>Views :</span>
          {item.Views?.length > 0 ? item.Views.length : 0}
        </div>
        <div className='Thumbnails_rating_cart'>
          <Ratings data={item.Ratings.length > 0 ? item.Ratings : 0} />
          <Icon 
            icon='mdi:cart' 
            className='iconify_cart' 
            onClick={() => HandleAddtoCartThumbs(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;