import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import UniversalContainerItem from 'components/UI/UniversalContainerItem';
import { READ_NEWS } from 'graphql/queries';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import { imageSource } from 'utils/scripts';

const News:React.FC = () => {
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
      {paginatedNews.length > 0?paginatedNews?.map((item: any, idx: number) => (
        <UniversalContainerItem key={idx} title={item.title} thumbnail={imageSource(item.thumbnail)} summary={item.summary} dateCreated={item.dateCreated} index={idx}/>
      )):(<h1>No Data</h1>)}
    </div>
  );
};

export default News;
