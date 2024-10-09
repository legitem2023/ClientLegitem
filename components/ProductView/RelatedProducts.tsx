'use client'
import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Ratings from 'components/Partial/Ratings/Ratings';
import { READ_FEEDBACK } from 'graphql/queries';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { createdPath, formatter, imageSource, ratings } from 'utils/scripts';

interface RelatedProductsProps {
  data: Array<{
    id: string;
    thumbnail: string | null;
    price: number;
    name: string;
    productCode:string;
    Ratings: any;
    Views:any;
    stock:any;
    TotalSoldItems:any
  }>;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ data }) => {
  const path = process.env.NEXT_PUBLIC_PATH;
  const [take, setTake] = useState(10);

  const [useLoading, setLoading] = useState(false);

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
  
  useEffect(() => {
    setLoading(false);
  },[take])
  const LoadMoreData = () =>{
    setTake(take + 5);
    setLoading(true);
  }


  return (
    <div className='MainView_Rchild'>
    <div className='LabelHead'>Related Product</div>
    <div className='MainView_RelatedProducts'>
    <div>
      {data.slice(0, take).map((item, idx) => (
        <div key={idx} className='MainView_RelatedProductsThumbs'>
            <Link href={`${path}Products/${item.id}`}>
              <Image
                src={imageSource(item)}
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
              <span>Name :</span>
                <span>
                  <span className='overflow_ellipsis'>{item.name}</span>
                </span>
            </div>
            <div>
              <span>Views :</span><span>{item.Views.length > 0 ?item.Views.length:0}</span>
            </div>
            <div>
              <span>Sold :</span><span>{item.TotalSoldItems > 0 ?item.TotalSoldItems:0}</span>
            </div>
            <div>
              <span>Stock :</span><span>{item.stock}</span>
            </div>

            <div className='Rates'>
              <div className='ViewsLikes'>
              <Ratings data={item.Ratings.length > 0 ?ratings(item.Ratings):0} count={item}/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className='LoadmoreContainer'>
      {data.length <=take?(<button className='universalINActiveButton'>End of Data</button>):(<button onClick={() => LoadMoreData()} className='universalButtonStyle'>
        {useLoading===true?(<Icon icon='eos-icons:bubble-loading' />):"Load More"} 
      </button>)}
    </div>
    </div>
    </div>
  );
};

export default RelatedProducts;
