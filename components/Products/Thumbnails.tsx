import React, { useState } from 'react';
import Image from 'next/image';
import Loading from 'components/LoadingAnimation/Loading';
import DataManager from 'utils/DataManager';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';

const path = process.env.NEXT_PUBLIC_PATH || '';
const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
const Manager = new DataManager();

const Thumbnails: React.FC = () => {
  const [take, setTake] = useState<number>(10);
  const [thumbnailSearch] = useGlobalState("thumbnailSearch");
  const [thumbnailCategory] = useGlobalState("thumbnailCategory");
  const [descAsc] = useGlobalState("descAsc");

  const { Products, loading } = Manager.productThumbnail();
  const { NumberOFViews, LoadingNumberOFViews } = Manager.NumberOfViews();

  if (LoadingNumberOFViews || loading) return <Loading />;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  const limitText = (text: string) => {
    return text.slice(0, 10) + (text.length > 10 ? '...' : '');
  };

  let thumbnailData = Products?.getChildInventory.slice() || [];

  if (thumbnailSearch) {
    const escapedSearchQuery = thumbnailSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearchQuery, 'i');
    thumbnailData = thumbnailData.filter((item: any) => regex.test(item.name));
  }

  if (thumbnailCategory) {
    thumbnailData = thumbnailData.filter((item: any) => item.category === thumbnailCategory);
  }

  if (descAsc === "High to Low") {
    thumbnailData.sort((a: any, b: any) => b.price - a.price);
  } else if (descAsc === "Low to High") {
    thumbnailData.sort((a: any, b: any) => a.price - b.price);
  }

  const ProductData: React.FC = () => {
    return (
      <div className='Thumbnails'>
        {thumbnailData.slice(0, take).map((item: any, idx: any) => (
          <div className='thumbnail' key={idx}>
            <div className='thumbnailImageContainer'>
              <Link href={path + `ProductView/?id=${item.id}`}>
                <Image
                  src={item.thumbnail ? imgPath + item.thumbnail : imgPath + 'Product-2024-0-5-22-47034.webp'}
                  height='256'
                  width='192'
                  alt={item.id}
                  className='thumbnailImage'
                />
              </Link>
              <Icon icon='ph:heart-bold' className='wish'></Icon>
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
              <div>
                <span>Ratings :</span>
                <span></span>
              </div>
              <div className='Rates'>
                <Image src={`https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Fivestarss-svg.svg`} width='256' height='50' alt={idx} priority={true} />
                <div className='Rates_values'>
                  {[0, 0, 0, 0, 0].map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </div>
              </div>
              <div className='ViewsLikes'>
                <span>Views :</span>
                <span>{NumberOFViews.getNumberOfViews.filter((numbitem: any) => numbitem.productCode === item.productCode).length}</span>
                <span>Likes :</span>
              </div>
            </div>
          </div>
        ))}
        <div className='viewmore'>
          {thumbnailData.length > 0 ? (
            <button onClick={() => setTake(take + 10)}>
              Load More
              <Icon icon='eos-icons:bubble-loading' />
            </button>
          ) : <h1>No Data</h1>}
        </div>
      </div>
    );
  };

  return <ProductData />;
};

export default Thumbnails;
