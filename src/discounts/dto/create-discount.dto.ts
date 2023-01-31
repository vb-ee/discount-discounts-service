import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0.0)
  @Max(100.0)
  discount: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  expiryDate: Date;

  @IsMongoId()
  @IsOptional()
  sectionId: string;

  @IsMongoId()
  @IsOptional()
  categoryId: string;
}
