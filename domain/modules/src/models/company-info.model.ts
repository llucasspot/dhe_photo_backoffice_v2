import { Model } from '@domain/core';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CompanyInfoModel extends Model<CompanyInfoModel> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  companyName!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{2}[0-9A-Z]+$/)
  @Transform(({ value }) => value?.trim().toUpperCase())
  vatNumber?: string;

  @IsBoolean()
  subjectToVat!: boolean;
}
