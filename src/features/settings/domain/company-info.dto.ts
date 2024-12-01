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
  @IsString({ message: 'settings.companyInfo.validation.companyName.IsString' })
  @IsNotEmpty({
    message: 'settings.companyInfo.validation.companyName.IsNotEmpty',
  })
  @MaxLength(100, {
    message: 'settings.companyInfo.validation.companyName.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  companyName!: string;

  @IsOptional()
  @IsString({ message: 'settings.companyInfo.validation.vatNumber.IsString' })
  @Matches(/^[A-Z]{2}[0-9A-Z]+$/, {
    message: 'settings.companyInfo.validation.vatNumber.Matches',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  vatNumber?: string;

  @IsBoolean({
    message: 'settings.companyInfo.validation.subjectToVat.IsBoolean',
  })
  subjectToVat!: boolean;

  static build<TBody>(body: TBody[]): CompanyInfoDto[];
  static build<TBody>(body: TBody): CompanyInfoDto;
  static build(body: unknown): CompanyInfoDto | CompanyInfoDto[] {
    return plainToInstance(this, body);
  }
}
