import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRawMaterialDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  supplier?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  leadTime?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  minimumStock?: number;
}