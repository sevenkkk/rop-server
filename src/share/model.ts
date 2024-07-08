export class Pagination {
  page: number;
  pageSize: number;
}

export class PaginationResult<T> {
  list: T[];
  total: number;
  page: number;

  constructor(list: T[], total: number, page: number) {
    this.list = list;
    this.total = total;
    this.page = page;
  }
}

export function getSkip(pagination: Pagination) {
  let { page, pageSize } = pagination;
  if (!page || page <= 0) {
    page = 1;
  }
  if (!pageSize || pageSize <= 0) {
    pageSize = 10;
  }
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
  };
}
