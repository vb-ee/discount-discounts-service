import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Discount,
  DiscountDocument,
} from 'src/discounts/schemas/discount.schema';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    return await this.sectionModel.create(createSectionDto);
  }

  async findAll() {
    const sections = await this.sectionModel.find();
    return { sections };
  }

  async findOne(id: string) {
    const section = await this.sectionModel.findById(id);
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);

    return { section };
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.sectionModel.findById(id);
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);
    await section.updateOne(updateSectionDto);
    return { _id: section._id, ...updateSectionDto };
  }

  async remove(id: string) {
    const section = await this.sectionModel.findByIdAndDelete(id);
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);

    return;
  }
  async findDiscountsBySection(id: string) {
    const section = await this.sectionModel.findById(id);
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);
    const discounts = await this.discountModel.find({ section: section._id });
    return { discounts };
  }
}
