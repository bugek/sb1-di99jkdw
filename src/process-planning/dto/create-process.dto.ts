import { IsString, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcessStatusType } from '../constants/process.constants';

export class CreateProcessDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  requiredResources: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  dependencies?: string[];

  @ApiProperty({
    enum: ['pending', 'in-progress', 'completed'],
    required: false,
  })
  @IsEnum(['pending', 'in-progress', 'completed'])
  @IsOptional()
  status?: ProcessStatusType;

  @ApiProperty({ required: false })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  completionDate?: Date;
}