import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import Pagination from 'components/Pagination/Pagination';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import { READ_NEWS } from 'graphql/queries';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import { imageSource } from 'utils/scripts';

const News = () => {
  const { data: News, loading: NewsLoading, error: NewsError } = useQuery(READ_NEWS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Slice the news data for the current page
  const paginatedNews = useMemo(() => {
    return News?.readNews?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [News, currentPage, itemsPerPage]);

  // Calculate total pages based on items per page
  const totalPages = useMemo(() => {
    return Math.ceil((News?.readNews?.length || 0) / itemsPerPage);
  }, [News, itemsPerPage]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (NewsLoading) return <Loading />;
  if (NewsError) return <div>Connection Error</div>;

  return (
    <div className='NewsContainer'>
      <UniversalPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {paginatedNews?.map((item: any, idx: number) => (
        <div key={idx} className='NewsContainerItem'>
          <div className='NewsContainerHead LabelHead'>
            <Icon icon="fa6-solid:newspaper" /> {item.title}
          </div>
          <div>
            <Image src={imageSource(item.thumbnail)} height={100} width={200} alt={`image${idx}`} />
          </div>
          <div>{item.summary}</div>
          <div className='NewsContainerFooter'>
            Date: <TimestampConverter timestamp={item.dateCreated} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
