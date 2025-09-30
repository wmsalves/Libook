import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  synopsis?: string;

  @IsInt()
  @IsOptional()
  publicationYear?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  pageCount?: number;

  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @IsArray()
  @IsString({ each: true })
  authorIds: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categoryIds?: string[];
}
