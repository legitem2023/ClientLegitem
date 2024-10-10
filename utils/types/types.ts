export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };

  export type DropdownProps = {
    path: string;
    deletecookies: (name: string) => void;
    OrderNotification: React.FC;
  }

  export type Post ={
    id: string;
    title: string;
    content: string;
    dateSent: string;
  }
  
  export type PostPaginationProps = {
    postsData: Post[];
  }
  
  export type RelatedProductsProps = {
    data: Array<{
      id: string;
      thumbnail: string | null;
      price: number;
      name: string;
      productCode:string;
      stock:any;
      TotalSoldItems:any;
      TotalRatings:any;
    }>;
  }