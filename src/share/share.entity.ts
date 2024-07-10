import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  page: number;
  @ApiProperty({
    type: Number,
    default: 10,
  })
  pageSize: number;
}

export class PaginationResultDto<T> {
  list: T[];
  total: number;
  current: number;

  constructor(list: T[], total: number, current: number) {
    this.list = list;
    this.total = total;
    this.current = current;
  }
}

export function getSkip(pagination: PaginationDto) {
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
