import React, { useCallback, useContext, useMemo } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { GET_CHILD_INVENTORY } from 'graphql/queries';
import Loading from 'components/Partial/LoadingAnimation/Loading';

import { setGlobalState, useGlobalState } from 'state';
import { Cart, handleError, handleLoading } from 'utils/scripts';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';

import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import DataManager from 'utils/DataManager';
import Thumbnail from 'components/UI/Thumbnail';
import { INSERT_LIKES } from 'graphql/mutation';

const Products: React.FC = () => {
  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [thumbnailProductTypes] = useGlobalState('thumbnailProductTypes');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const Manager = new DataManager();
  const path = process.env.NEXT_PUBLIC_PATH || '';
  const [CurrentPage] = useGlobalState('CurrentPage');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');
  const [userEmail] = useGlobalState('cookieEmailAddress');
  const { data: ProductsData, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY,{
    fetchPolicy: 'cache-and-network',
  });

  const [insertLikes] = useMutation(INSERT_LIKES,{
    onCompleted: (data) => {
      if(data.insertLikes.statusText === "Successful!"){
        Manager.Success("You Likes the Product");
      }
      console.log(data.insertLikes);
    }
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
  const HandleAddtoCartThumbs = (item) =>{
    handleAddToCart(Cart([item], Manager, 1))
    setGlobalState('thumbnailSearch', "0");
  }

  const HandleAddtoLikelistThumbs = (item) =>{
    if(!userEmail) return document.location.href='./Login'
    insertLikes({
      variables:{
        "likesParamInput": {
          "accountEmail": userEmail,
          "productCode": item
        }
      }
    })
  }

  return (
    <>
    <div className="Thumbnails">
      {paginatedProducts.length > 0?paginatedProducts.map((item: any, idx: number) => (
        <Thumbnail key={idx} 
                   item={item} 
                   path={path} 
                   handleLoading={handleLoading}
                   handleError={handleError}
                   HandleAddtoCartThumbs={HandleAddtoCartThumbs}
                   HandleAddtoLikelistThumbs={HandleAddtoLikelistThumbs}/>
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

export default Products;
