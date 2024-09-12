import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import Ratings from 'components/Partial/Ratings/Ratings';
import Views from './Views';
import Pagination from 'components/Pagination/Pagination';
import { setGlobalState, useGlobalState } from 'state';
import { createdPath, formatter, handleError, handleLoading, imageSource, limitText } from 'utils/scripts';

const Thumbnails: React.FC = () => {
  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [thumbnailProductTypes] = useGlobalState('thumbnailProductTypes');


  const [CurrentPage] = useGlobalState('CurrentPage');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');
  const { data: Products, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY,{
    fetchPolicy: 'cache-and-network',
  });
  // console.log(Products)
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

  console.log(paginatedProducts)
  return (
    <div className="Thumbnails">
      {paginatedProducts.map((item: any, idx: number) => (
        <div className="thumbnail" key={idx}>
          <div className="thumbnailImageContainer">
            <Link href={createdPath(item)}>
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
            <div>
              <span>Name :</span>
              <span>{item.name ? limitText(item.name) : 'Untitled'}</span>
            </div>
            <div className="ViewsLikes">
              <span>Views :</span>
              <Views data={item} />
            </div>
            <div>
              <Ratings />
            </div>
          </div>
        </div>
      ))}
      <div className="viewmore">
        <Pagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Thumbnails;
