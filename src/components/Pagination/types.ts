export interface PaginationPropTypes {
  pagesCount: number;
  className?: string;
  handleClickPage?: (page: number | string) => void;
  currentPage?: number;
  pageSize?: number;
}
