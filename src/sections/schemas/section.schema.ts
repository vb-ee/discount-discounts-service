import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop()
  title: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
