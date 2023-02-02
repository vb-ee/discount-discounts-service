import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0.0)
  @Max(100.0)
  discount: number;

  @IsDateString()
  expiryDate: Date;

  @IsUrl()
  @IsOptional()
  imageUrl: string;

  @IsMongoId()
  category: string;
}
