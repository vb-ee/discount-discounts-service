import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
  IsDateString,
} from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0.0)
  @Max(100.0)
  discount: number;

  @IsDateString()
  expiryAt: Date;

  @IsMongoId()
  category: string;
}
