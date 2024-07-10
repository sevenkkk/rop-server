import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResultDto } from '@/src/share/share.entity';

export const ApiListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: 'PaginationResultDto',
        allOf: [
          { $ref: getSchemaPath(PaginationResultDto) },
          {
            properties: {
              total: { type: 'number', default: '0' },
              current: { type: 'number', default: '1' },
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
