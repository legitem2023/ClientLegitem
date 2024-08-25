import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
import { GET_CHILD_INVENTORY, GET_NUM_OF_VIEWS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { formatter } from 'utils/scripts';
import Ratings from 'components/Partial/Ratings/Ratings';

const path = process.env.NEXT_PUBLIC_PATH || '';
const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';

const limitText = (text: string) => text.length > 10 ? `${text.slice(0, 10)}...` : text;

const fallbackImage = 'Product-2024-0-5-22-47034.webp';

const Thumbnails: React.FC = () => {
  const [take, setTake] = useState<number>(20);
  const [thumbnailSearch] = useGlobalState("thumbnailSearch");
  const [thumbnailCategory] = useGlobalState("thumbnailCategory");
  const [descAsc] = useGlobalState("descAsc");

  const { data: Products, loading: productsLoading } = useQuery(GET_CHILD_INVENTORY);
  const { data: NumberOFViews, loading: viewsLoading } = useQuery(GET_NUM_OF_VIEWS);

  const handleError = useCallback((event: any) => {
    event.target.src = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;

    event.target.srcset = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;
  }, []);

  const filteredAndSortedData = useMemo(() => {
    if (!Products?.getChildInventory) return [];

    let data = Products.getChildInventory;

    if (thumbnailSearch) {
      const escapedSearchQuery = thumbnailSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedSearchQuery, 'i');
      data = data.filter((item: any) => regex.test(item.name));
    }

    if (thumbnailCategory) {
      data = data.filter((item: any) => item.category === thumbnailCategory);
    }

    if (descAsc === "High to Low") {
      data.sort((a: any, b: any) => b.price - a.price);
    } else if (descAsc === "Low to High") {
      data.sort((a: any, b: any) => a.price - b.price);
    }

    return data;
  }, [Products, thumbnailSearch, thumbnailCategory, descAsc]);

  if (productsLoading || viewsLoading) return <Loading />;

  return (
    <div className='Thumbnails'>
      {filteredAndSortedData.slice(0, take).map((item: any, idx: number) => (
        <div className='thumbnail' key={idx}>
          <div className='thumbnailImageContainer'>
            <Link href={`${path}Products/${item.id}?data=${encodeURIComponent(btoa(JSON.stringify(item)))}`}>
              <Image
                src={item.thumbnail ? `${imgPath}${item.thumbnail}` : `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`}
                height='156'
                width='200'
                quality={1}
                alt={item.id}
                priority
                onError={handleError}
                className='thumbnailImage'
              />
            </Link>
          </div>
          <div className='thumbnailTextContainer'>
            <div>
              <span>Price :</span>
              <span>{formatter.format(item.price)}</span>
            </div>
            <div>
              <span>Name :</span>
              <span>{item.name ? limitText(item.name) : 'Untitled'}</span>
            </div>
            <div className='ViewsLikes'>
              <span>Views :</span>
              <span>{NumberOFViews.getNumberOfViews.filter((numbitem: any) => numbitem.productCode === item.productCode).length}</span>
            </div>
            <div className='ViewsLikes'>
              <Ratings />
            </div>
          </div>
        </div>
      ))}
      <div className='viewmore'>
        {filteredAndSortedData.length > 0 ? (
          <button onClick={() => setTake(take + 10)}>
            Load More
            <Icon icon='eos-icons:bubble-loading' />
          </button>
        ) : (
          <h1>No Data</h1>
        )}
      </div>
    </div>
  );
};

export default Thumbnails;
