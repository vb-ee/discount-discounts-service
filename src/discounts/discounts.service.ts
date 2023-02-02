import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generateImageUrl, sendMessage } from '@payhasly-discount/common';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount, DiscountDocument } from './schemas/discount.schema';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async create(
    createDiscountDto: CreateDiscountDto,
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File has to be defined');
    const imageUrl = generateImageUrl('API_GATEWAY_URL', file.filename);
    const discountToCreate = { imageUrl, ...createDiscountDto };
    const discount = await this.discountModel.create(discountToCreate);

    return discount;
  }

  async findAll() {
    const discounts = await this.discountModel.find().populate('category');
    return { discounts };
  }

  async findOne(id: string) {
    const discount = await this.discountModel.findById(id).populate('category');
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

    const discount = await this.discountModel.findById(id);
    if (!discount)
      throw new NotFoundException(`Discount with id ${id} not found`);

    if (file) {
      await sendMessage('AMQP_URL', discount.imageUrl, 'deleteImage');
      imageUrl = generateImageUrl('API_GATEWAY_URL', file.filename);
    }

    const discountToUpdate = { imageUrl, ...updateDiscountDto };
    await discount.updateOne(discountToUpdate);

    return { _id: discount._id, ...discountToUpdate };
  }

  async remove(id: string) {
    const discount = await this.discountModel.findById(id);
    if (!discount)
      throw new NotFoundException(`Discount with id ${id} not found`);

    await sendMessage('AMQP_URL', discount.imageUrl, 'deleteImage');
    await discount.delete();

    return;
  }
}
