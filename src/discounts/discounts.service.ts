import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { ImageUtil } from 'src/utils/ImageUtil';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async create(
    createDiscountDto: CreateDiscountDto,
    file: Express.Multer.File,
  ) {
    const imageUrl = `${file.destination}/${file.originalname}`;
    ImageUtil.renameImage(file.path, imageUrl);

    const discountToCreate = { imageUrl, ...createDiscountDto };

    const discount = await this.discountModel.create(discountToCreate);

    return discount;
  }

  async findAll() {
    const discounts = await this.discountModel.find();
    return { discounts };
  }

  async findOne(id: string) {
    const discount = await this.discountModel
      .findById(id)
      .populate('category')
      .populate('section');
    if (!discount)
      throw new NotFoundException(`Discount with id ${id} not found`);

    return { discount };
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
    file?: Express.Multer.File,
  ) {
    let imageUrl: string;

    let discount = await this.discountModel.findById(id);
    if (!discount)
      throw new NotFoundException(`Discount with id ${id} not found`);

    if (file) {
      ImageUtil.removeImage(discount.imageUrl);
      imageUrl = `${file.destination}/${file.originalname}`;
      ImageUtil.renameImage(file.path, imageUrl);
    }

    const discountToUpdate = { imageUrl, ...updateDiscountDto };
    discount = await discount.update(discountToUpdate);
    return { discount };
  }

  async remove(id: string) {
    const discount = await this.discountModel.findByIdAndDelete(id);
    if (!discount)
      throw new NotFoundException(`Category with id ${id} not found`);

    ImageUtil.removeImage(discount.imageUrl);

    return;
  }

  async findAllByCategory(categoryId: string) {
    const discounts = await this.discountModel.find({ category: categoryId });
    return { discounts };
  }

  async findAllBySection(sectionId: string) {
    const discounts = await this.discountModel.find({ section: sectionId });
    return { discounts };
  }
}
