'use client'
import Ratings from 'components/Partial/Ratings/Ratings';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { formatter } from 'utils/scripts';

interface RelatedProductsProps {
  data: Array<{
    id: string;
    thumbnail: string | null;
    price: number;
    name: string;
  }>;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ data }) => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const fallbackImage = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;
  const handleError = useCallback((event: any) => {
    event.target.src = fallbackImage;
    event.target.srcset = fallbackImage;
  }, []);
  const handleLoading = useCallback((event: any) => {
    event.target.src = path +`/Loading.webp`;
    event.target.srcset = path +`/Loading.webp`;
  }, []);

  const createdPath = useCallback((data: any) => {
    return `${path}Products/${data.id}?data=${encodeURIComponent(btoa(JSON.stringify(data)))}`;
  }, []);
  return (
    <div>
      {data.map((item, idx) => (
        <div key={idx} className='MainView_RelatedProductsThumbs'>
            <Link href={createdPath(item)}>
              <Image
                src={item.thumbnail ? `${imgPath}${item.thumbnail}` : fallbackImage}
                height='200'
                width='200'
                quality={1}
                alt={item.id}
                priority
                onError={handleError}
                onClick={handleLoading}/>
            </Link>
          <div className='thumbnailTextContainer'>
            <div>
              <span>Price :</span><span>{formatter.format(item.price)}</span>
            </div>
            <div>
              <span>Name :</span><span>{item.name}</span>
            </div>
            <div>
              <span>Ratings :</span><span></span>
            </div>
            <div>
              <span>Size :</span><span></span>
            </div>
            <div className='Rates'>
              <div className='ViewsLikes'>
                <Ratings />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
