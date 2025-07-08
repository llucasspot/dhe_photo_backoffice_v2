import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { plainToInstance, Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class CompanyInfoDto extends Dto<CompanyInfoDto> {
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

  static build<TBody>(body: TBody[]): CompanyInfoDto[];
  static build<TBody>(body: TBody): CompanyInfoDto;
  static build(body: unknown): CompanyInfoDto | CompanyInfoDto[] {
    return plainToInstance(this, body);
  }
}
