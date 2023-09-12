export interface PaginationPropTypes {
  pagesCount: number | undefined;
  className?: string;
  handleClickPage?: (page: string) => void;
  currentPage?: number;
  pageSize?: number;
}
