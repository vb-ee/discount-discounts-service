import {
  IsString,
  IsDate,
  IsNumber,
  Min,
  Max,
  MinDate,
  IsMongoId,
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

  @IsDate()
  @MinDate(new Date())
  expiryDate: Date;

  @IsMongoId()
  section: string;

  @IsMongoId()
  category: string;
}
