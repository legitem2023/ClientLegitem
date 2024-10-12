import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings'; // Assume you have a Ratings component
import { formatter, imageSource } from 'utils/scripts'; // Assuming you have utilities for formatting and image source
import LikeCmd from '../Commands/LikeCmd';
import AddCartCmd from '../Commands/AddCartCmd';
import Optional3D from 'components/Commands/Optional3D';
import Discounted_ from 'components/Commands/Discounted';
import Price from './Price';
import Price_strike from './Price_strike';
import Discounted from './Discounted';
import Name from './Name';
import Sold from './Sold';
import Element from './Element';

type ThumbnailProps = {
  item: any;
  path: string;
  handleLoading: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // Updated to accept the event
}

const Thumbnail: React.FC<ThumbnailProps> = ({ 
  item, 
  path, 
  handleLoading, 
  handleError, 
}) => {
// console.log(item)
  return (
    <div className="thumbnail">
      <div className="thumbnailImageContainer">
        {item.model===null?"":(<Optional3D/>)}
        {item.discount > 0?(<Discounted_/>):""}
        
        <Link href={`${path}Products/${item.id}`}>
          <Image
            src={imageSource(item)}
            height="200"
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
        <Element Label="Name" value={item.name} />
        {item.discount > 0?(<Price_strike item={item}/>):(<Price item={item}/>)}
        {item.discount > 0?(<Discounted item={item}/>):""}
        <Element Label="Sold" value={item.TotalSoldItems ? item.TotalSoldItems : '0'} />
        <div className='Thumbnails_rating_cart'>
          <span>
            <Ratings data={item.TotalRatings > 0 ? item.TotalRatings : 0} count={item}/>
          </span>
          <span className='thumbElements_addCart'>
            <AddCartCmd item={item} />
          </span>        
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
