import React, { useCallback, useMemo } from 'react';

import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';

import { setGlobalState, useGlobalState } from 'state';
import { handleError, handleLoading } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import { useRouter,useParams } from 'next/navigation';

import Thumbnail from 'components/UI/Thumbnail';
import { decode } from 'js-base64';

const Store: React.FC = () => {
  const param:any = useParams();

  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [thumbnailProductTypes] = useGlobalState('thumbnailProductTypes');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const path = process.env.NEXT_PUBLIC_PATH || '';
  const [CurrentPage] = useGlobalState('CurrentPage');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY,{
    fetchPolicy: 'cache-and-network',
  });


  const filteredProducts = useMemo(() => {
    if (!ProductsData) return [];
    
    return ProductsData?.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(thumbnailSearch.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(thumbnailCategory.toLowerCase())
      )
  }, [ProductsData, thumbnailSearch, thumbnailCategory,thumbnailProductTypes]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    return filteredProducts.filter(((item:any) => item.agentEmail === decode(param.id))).sort((a: any, b: any) => {

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

  return (
    <>
    <div className="Thumbnails">
      {paginatedProducts.length > 0?paginatedProducts.map((item: any, idx: number) => (
        <Thumbnail key={idx} 
                   item={item} 
                   path={path} 
                   handleLoading={handleLoading}
                   handleError={handleError}/>
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

export default Store;
