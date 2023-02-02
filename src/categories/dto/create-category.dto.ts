import { IsHexColor, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsHexColor()
  color: string;

  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
