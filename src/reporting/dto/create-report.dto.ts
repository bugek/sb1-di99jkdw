import { IsString, IsDate, IsObject, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  metrics?: Record<string, number>;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  data?: any[];

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  insights?: Record<string, any>;
}