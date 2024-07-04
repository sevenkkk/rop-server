export type Pagination<T> = T & {
  limit: number;
  pageSize: number;
};
