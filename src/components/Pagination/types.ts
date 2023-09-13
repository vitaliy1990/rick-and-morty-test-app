export interface PaginationPropTypes {
  pagesCount: number | undefined;
  className?: string;
  handleClickPage?: (page: number) => void;
  currentPage?: number;
  pageSize?: number;
}
