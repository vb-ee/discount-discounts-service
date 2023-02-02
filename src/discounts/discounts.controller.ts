import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Express, Request } from 'express';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto, @Req() req: Request) {
    return this.discountsService.create(createDiscountDto, req.file);
  }

  @Get()
  findAll() {
    return this.discountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
    @Req() req: Request,
  ) {
    return this.discountsService.update(id, updateDiscountDto, req.file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.discountsService.remove(id);
  }
}
