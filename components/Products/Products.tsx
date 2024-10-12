import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { setGlobalState, useGlobalState } from 'state';
import { handleError, handleLoading } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import Thumbnail from 'components/UI/Thumbnail';

const itemsPerPage = 20; // Move constant outside component

const Products: React.FC = () => {
  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [thumbnailProductTypes] = useGlobalState('thumbnailProductTypes');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const [thumbnailDiscounted] = useGlobalState('thumbnailDiscounted');
  const [thumbnailNewData] = useGlobalState("thumbnailNewData");
  const path = process.env.NEXT_PUBLIC_PATH || '';
  const [CurrentPage] = useGlobalState('CurrentPage');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');

  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY);


  // Memoize filtered and sorted products to avoid unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!ProductsData) return [];

    return ProductsData?.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(thumbnailSearch.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(thumbnailCategory.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.productType?.toLowerCase()?.includes(thumbnailProductTypes.toLowerCase())
      );
  }, [ProductsData, thumbnailSearch, thumbnailCategory, thumbnailProductTypes]);

  const sortedProducts = useMemo(() => {
    return filteredProducts?.sort((a: any, b: any) => {
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



  const paginatedProducts = useMemo(() => {
    return sortedProducts?.slice(
      (CurrentPage - 1) * itemsPerPage,
      CurrentPage * itemsPerPage
    );
  }, [sortedProducts, CurrentPage]);


  const handlePageChange = useCallback((page: number) => {
    setGlobalState('CurrentPage', page);
  }, []);


  const DiscountedData = useMemo(() => {
    return thumbnailDiscounted==="" ? paginatedProducts :paginatedProducts?.filter((item: any) => item?.discount > 0);
  }, [paginatedProducts,thumbnailDiscounted]);


  const NewItemData = useMemo(() => {
    return thumbnailNewData==="" ? DiscountedData :DiscountedData?.filter((post:any) => {
      const postDate = new Date(parseInt(post?.dateUpdated));
      return postDate.toDateString() === new Date().toDateString();
    });
  }, [DiscountedData,thumbnailNewData]);


  const totalPages = useMemo(() => Math.ceil((NewItemData?.length || 0) / itemsPerPage), [NewItemData]);



  if (productsLoading) return <Loading />;
  if (productsError) return <h1>Connection Error</h1>;
  return (
    <div className="Thumbnails">
      {NewItemData.length > 0 ? (
        NewItemData.map((item: any, idx: number) => (
          <Thumbnail
            key={idx}
            item={item}
            path={path}
            handleLoading={handleLoading}
            handleError={handleError}
          />
        ))
      ) : (
        <h2>No Data</h2>
      )}
      <div className="viewmore">
        <UniversalPagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
