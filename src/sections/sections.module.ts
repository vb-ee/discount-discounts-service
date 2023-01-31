import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section, SectionSchema } from './schemas/section.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Discount,
  DiscountSchema,
} from 'src/discounts/schemas/discount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Discount.name, schema: DiscountSchema },
    ]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
