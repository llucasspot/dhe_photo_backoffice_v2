import { AddressDto } from './address.dto';
import { BankInfoDto } from './bank-info.dto';
import { CompanyInfoDto } from './company-info.dto';
import { PersonalInfoDto } from './personal-info.dto';

import { Dto } from '#core/domain';

export class UserSettingsDto extends Dto<UserSettingsDto> {
  declare personalInfo: PersonalInfoDto;
  declare companyInfo: CompanyInfoDto;
  declare address: AddressDto;
  declare bankInfo: BankInfoDto;
}
