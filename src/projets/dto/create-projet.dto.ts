import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}