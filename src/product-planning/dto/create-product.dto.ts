import { IsString, IsNumber, IsArray, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PRODUCT_CONSTANTS, ProductStatus } from '../constants/product.constants';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  deadline: Date;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  requiredMaterials: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  processes: string[];

  @ApiProperty({ enum: Object.values(PRODUCT_CONSTANTS.STATUS), required: false })
  @IsEnum(PRODUCT_CONSTANTS.STATUS)
  @IsOptional()
  status?: ProductStatus;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  priority?: number;
}