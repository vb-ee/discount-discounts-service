import {
  IsString,
  IsDate,
  IsNumber,
  Min,
  Max,
  MinDate,
  IsMongoId,
  IsOptional,
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
  @IsOptional()
  section: string;

  @IsMongoId()
  @IsOptional()
  category: string;
}
