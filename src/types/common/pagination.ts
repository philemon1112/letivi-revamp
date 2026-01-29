export type PaginationOptions = {
  pageIndex: number;
  totalPages: number;
  totalRecords: number;
};

export type PaginationParams = {
  page: number | unknown;
  limit: number;
  filter?: string;
  private?: number;
  search?: string | null;
  category_id?: string | number | null;
  user_id?: string | number | null;
};

export type SearchPaginationParams = {
  query: string;
};
