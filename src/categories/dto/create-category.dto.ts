import { IsHexColor, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsHexColor()
  color: string;
}
