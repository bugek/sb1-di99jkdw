import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiResponseDecorator(options: {
  status: number;
  description: string;
  type?: any;
}) {
  return applyDecorators(
    ApiResponse({
      status: options.status,
      description: options.description,
      type: options.type,
    }),
  );
}