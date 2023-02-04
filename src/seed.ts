import { accessEnv } from '@payhasly-discount/common';
import mongoose from 'mongoose';
import { Schema, model, Types } from 'mongoose';

interface IDiscount {
  title: string;
  description: string;
  discount: number;
  imageUrl: string;
  createdAt: Date;
  expiryAt: Date;
  category: Types.ObjectId;
}

export const discountSchema = new Schema<IDiscount>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  expiryAt: { type: Date, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const Discount = model<IDiscount>('Discount', discountSchema);

export const categorySchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Category = model('Category', categorySchema);

const categoriesData = [
  {
    title: 'Green Plant',
    color: '#228B22',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c1.jpg`,
  },
  {
    title: 'Red Rose',
    color: '#FF0000',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c2.jpg`,
  },
  {
    title: 'Blue Sky',
    color: '#87CEEB',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c3.jpg`,
  },
  {
    title: 'Orange Sunset',
    color: '#FFA500',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c4.jpg`,
  },
  {
    title: 'Pink Flamingo',
    color: '#FF69B4',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c5.jpg`,
  },
  {
    title: 'Purple Grape',
    color: '#800080',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c6.jpg`,
  },
  {
    title: 'Yellow Sunflower',
    color: '#FFFF00',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c7.jpg`,
  },
  {
    title: 'Black Raven',
    color: '#000000',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c8.jpg`,
  },
  {
    title: 'White Dove',
    color: '#FFFFFF',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c9.jpg`,
  },
  {
    title: 'Brown Bear',
    color: '#A52A2A',
    imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/c10.jpg`,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(accessEnv('MONGO_DB_URI'));

    await Discount.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.create(categoriesData);
    const discountsData = generateDiscounts();

    let k = 0;
    for (const category of categories) {
      const discounts = [];
      for (let i = 0; i < 10; i++) {
        discounts.push({
          ...discountsData[i + k],
          category: category._id,
        });
      }
      k += 10;
      await Discount.create(discounts);
    }

    console.log('Seed data successfully added to the database.');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
};

const generateDiscounts = () => {
  const discounts = [];

  for (let i = 0; i < 100; i++) {
    const title = `Title ${i}`;
    const description = `Description ${i}`;
    const discount = (Math.random() * 100).toFixed(2);
    const imageUrl = `${accessEnv('API_GATEWAY_URL')}/images/discount.jpg`;
    const createdAt = new Date();
    const expiryAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24 * 7);

    discounts.push({
      title,
      description,
      discount,
      imageUrl,
      createdAt,
      expiryAt,
    });
  }

  return discounts;
};

seed();
