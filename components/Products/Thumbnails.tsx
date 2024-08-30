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
import { formatter } from 'utils/scripts';
const path = process.env.NEXT_PUBLIC_PATH || '';
const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
const fallbackImage = `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`;

const limitText = (text: string) => (text.length > 10 ? `${text.slice(0, 10)}...` : text);

const Thumbnails: React.FC = () => {
  const [thumbnailCategory] = useGlobalState('thumbnailCategory');
  const [CurrentPage] = useGlobalState('CurrentPage');
  const [thumbnailSearch] = useGlobalState('thumbnailSearch');
  const [sortBy] = useGlobalState('sortBy');
  const [sortDirection] = useGlobalState('sortDirection');
  console.log(sortBy)
  const { data: Products, loading: productsLoading, error: productsError } = useQuery(GET_CHILD_INVENTORY);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = fallbackImage;
    event.currentTarget.srcset = fallbackImage;
  }, []);

  const handleLoading = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `${path}/Loading.webp`;
    event.currentTarget.srcset = `${path}/Loading.webp`;
  }, []);

  const createdPath = useCallback((data: any) => {
    return `${path}Products/${data.id}?data=${encodeURIComponent(btoa(JSON.stringify(data)))}`;
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Products) return [];

    return Products.getChildInventory
      ?.filter((item: any) =>
        item?.name?.toLowerCase()?.includes(thumbnailSearch.toLowerCase())
      )
      ?.filter((item: any) =>
        item?.category?.toLowerCase()?.includes(thumbnailCategory.toLowerCase())
      );
  }, [Products, thumbnailSearch, thumbnailCategory]);

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

  const paginatedProducts = useMemo(() => {
    const itemsPerPage = 20;
    return sortedProducts.slice(
      (CurrentPage - 1) * itemsPerPage,
      CurrentPage * itemsPerPage
    );
  }, [sortedProducts, CurrentPage]);

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
    <div className="Thumbnails">
      {paginatedProducts.map((item: any, idx: number) => (
        <div className="thumbnail" key={idx}>
          <div className="thumbnailImageContainer">
            <Link href={createdPath(item)}>
              <Image
                src={item.thumbnail ? `${imgPath}${item.thumbnail}` : fallbackImage}
                height="156"
                width="200"
                quality={1}
                alt={item.id}
                priority
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
            <div className="ViewsLikes">
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
