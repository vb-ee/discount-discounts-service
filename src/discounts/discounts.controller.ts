import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  HttpCode,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Express } from 'express';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('discount', {
      dest: join(`${process.env.PWD}/`, 'images'),
    }),
  )
  create(
    @Body() createDiscountDto: CreateDiscountDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(png|jpg|jpeg)$/,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.discountsService.create(createDiscountDto, file);
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
  @UseInterceptors(
    FileInterceptor('discount', {
      dest: join(`${process.env.PWD}/`, 'images'),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(png|jpg|jpeg)$/,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.discountsService.update(id, updateDiscountDto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.discountsService.remove(id);
  }

  @Get()
  findAllByCategory(@Query('categoryId') categoryId: string) {
    return this.discountsService.findAllByCategory(categoryId);
  }

  @Get()
  findAllBySection(@Query('sectionId') sectionId: string) {
    return this.discountsService.findAllBySection(sectionId);
  }
}
