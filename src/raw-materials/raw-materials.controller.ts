import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { RawMaterial } from './schemas/raw-material.schema';

@ApiTags('raw-materials')
@Controller('raw-materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new raw material' })
  create(@Body() createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all raw materials' })
  findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a raw material by id' })
  findOne(@Param('id') id: string): Promise<RawMaterial> {
    return this.rawMaterialsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a raw material' })
  update(
    @Param('id') id: string,
    @Body() updateRawMaterialDto: CreateRawMaterialDto,
  ): Promise<RawMaterial> {
    return this.rawMaterialsService.update(id, updateRawMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a raw material' })
  remove(@Param('id') id: string): Promise<RawMaterial> {
    return this.rawMaterialsService.remove(id);
  }

  @Get('ai/predict-shortages')
  @ApiOperation({ summary: 'Predict material shortages using AI/ML' })
  predictShortages() {
    return this.rawMaterialsService.predictMaterialShortages();
  }
}