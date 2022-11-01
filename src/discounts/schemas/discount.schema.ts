import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: false })
export class Discount {
  @Prop()
  title: string;

  @Prop()
  discount: number;

  @Prop()
  quantity: number;

  @Prop()
  imageUrl: string;

  @Prop({ default: new Date() })
  createdDate: Date;

  @Prop()
  expiryDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
  sectionId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
  categoryId: Types.ObjectId;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
