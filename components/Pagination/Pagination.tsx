import React from 'react';
import { Icon } from '@iconify/react';
import useCurrentPage from 'store/useCurrentPage';
import { setGlobalState } from 'state';


type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

  const { setCurrentPage } = useCurrentPage();

  const siblingsCount = 2;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pagesToShow = range(
    Math.max(1, currentPage - siblingsCount),
    Math.min(totalPages, currentPage + siblingsCount)
  );

  return (
    <div className='flex justify-center my-4 bg-stone-400 border-4 border-stone-500 p-2'>
      <button
        className="transformRotate"
        onClick={() => {onPageChange(1);setGlobalState("CurrentPage",currentPage + 1)}}
        disabled={currentPage === 1}>
        <Icon icon="gg:chevron-double-right" style={{transform:'scaleX(-1)'}} />
      </button>
      <button
        className="transformRotate"
        onClick={() => {onPageChange(currentPage - 1);setGlobalState("CurrentPage",currentPage - 1)}}
        disabled={currentPage === 1}>
        <Icon icon="gg:chevron-right" style={{transform:'scaleX(-1)'}}/>
      </button>

      {pagesToShow.map(page => (
        <button
          key={page}
          onClick={() => {onPageChange(page);setGlobalState("CurrentPage",page)}}>
          {page}
        </button>
      ))}

      <button
        className="transformRotate"
        onClick={() => {onPageChange(currentPage + 1);setGlobalState("CurrentPage",currentPage + 1)}}
        disabled={currentPage === totalPages}>
        <Icon icon="gg:chevron-right" />
      </button>

      <button
        className="transformRotate"
        onClick={() => {onPageChange(totalPages);setGlobalState("CurrentPage",totalPages)}}
        disabled={currentPage === totalPages}>
        <Icon icon="gg:chevron-double-right"/>
      </button>

    </div>
  );
};

export default Pagination;