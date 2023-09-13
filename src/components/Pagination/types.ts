export interface PaginationPropTypes {
  pagesCount: number | undefined;
  className?: string;
  handleClickPage?: (page: number /* | string */) => void;
  currentPage?: number;
  pageSize?: number;
}
