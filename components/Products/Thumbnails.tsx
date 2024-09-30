import React, { useCallback, useContext, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY, READ_CATEGORY,READ_FEEDBACK } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Ratings from 'components/Partial/Ratings/Ratings';
import Views from './Views';
import Pagination from 'components/Pagination/Pagination';
import { setGlobalState, useGlobalState } from 'state';
import { Cart, createdPath, formatter, handleError, handleLoading, imageSource, limitText, ratings } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import { Gallery } from 'components/Gallery/Gallery';
import { Icon } from '@iconify/react';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import DataManager from 'utils/DataManager';

const Thumbnails: React.FC = () => {
  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [thumbnailProductTypes] = useGlobalState('thumbnailProductTypes');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const Manager = new DataManager();
  const path = process.env.NEXT_PUBLIC_PATH || '';
  const [CurrentPage] = useGlobalState('CurrentPage');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(READ_CATEGORY);
  const { data: Products, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY,{
    fetchPolicy: 'cache-and-network',
  });
  const { data: feedBackData, loading: feedBackLoading, error: feedBackError } = useQuery(READ_FEEDBACK);


  const filteredProducts = useMemo(() => {
    if (!Products) return [];
    
    return Products.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(thumbnailSearch.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(thumbnailCategory.toLowerCase())
      )
      // ?.filter((item: any) =>
      //   item?.productType?.toLowerCase()?.includes(thumbnailProductTypes.toLowerCase())
      // )
  }, [Products, thumbnailSearch, thumbnailCategory,thumbnailProductTypes]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    return filteredProducts.sort((a: any, b: any) => {

      if (sortBy === 'price') {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [filteredProducts, sortBy, sortDirection]);  


  const itemsPerPage = 20;

  const paginatedProducts = sortedProducts.slice(
      (CurrentPage - 1) * itemsPerPage,
      CurrentPage * itemsPerPage);

  const totalPages = useMemo(() => {
    const itemsPerPage = 20;
    return Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  }, [filteredProducts]);

  const handlePageChange = useCallback((page: number) => {
    setGlobalState('CurrentPage', page);
  }, []);
  if (productsLoading) return <Loading />;
  if (productsError) return <h1>Connection Error</h1>;
  if (feedBackLoading) return
  // if(categoryLoading) return

console.log(feedBackData)
  const HandleAddtoCartThumbs = (item) =>{
    handleAddToCart(Cart([item], Manager, 1))
    setGlobalState('thumbnailSearch', "0");
    // setGlobalState('thumbnailSearch',null);
  }

  return (
    <>
    <div className="Thumbnails">
      {paginatedProducts.length > 0?paginatedProducts.map((item: any, idx: number) => (
        <div className="thumbnail" key={idx}>
          <div className="thumbnailImageContainer">
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
              <Views data={item} />
            </div>
            <div className='Thumbnails_rating_cart'>
              <Ratings data={ratings(item.productCode,feedBackData?.readFeedBack)===null || 
                               ratings(item.productCode,feedBackData?.readFeedBack)===0?0:
                             ratings(item.productCode,feedBackData?.readFeedBack)}/>

              <Icon icon='mdi:cart' className='iconify_cart' onClick={()=> HandleAddtoCartThumbs(item)}/>
            </div>
          </div>
        </div>
      )):(<h2>No Data</h2>)}
      <div className="viewmore">
        <UniversalPagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
    </>
  );
};

export default Thumbnails;
