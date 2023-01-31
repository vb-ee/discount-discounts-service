import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generateImageUrl, messageBroker } from '@payhasly-discount/common';
import { Model } from 'mongoose';
import {
  Discount,
  DiscountDocument,
} from 'src/discounts/schemas/discount.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    const { title, color } = createCategoryDto;
    if (!file) throw new BadRequestException('File has to be defined');
    const imageUrl = generateImageUrl('API_GATEWAY_URL', file.filename);

    const category = await this.categoryModel.create({
      title,
      color,
      imageUrl,
    });

    return { category };
  }

  async findAll() {
    const categories = await this.categoryModel.find();
    return { categories };
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return { category };
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ) {
    const { title, color } = updateCategoryDto;
    let imageUrl: string;

    let category = await this.categoryModel.findById(id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    if (file) {
      await messageBroker('AMQP_URL', category.imageUrl, 'deleteImage');
      imageUrl = generateImageUrl('API_GATEWAY_URL', file.filename);
    }

    category = await category.update({ title, color, imageUrl });

    return { category };
  }

  async remove(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    await messageBroker('AMQP_URL', category.imageUrl, 'deleteImage');
    await category.delete();

    return;
  }

  async findDiscountsByCategory(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    const discounts = await this.discountModel.find({ category: category._id });
    return { discounts };
  }
}
