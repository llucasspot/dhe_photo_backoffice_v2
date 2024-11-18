export interface AddressDto {
  countryIsoCode: string;
  address1: string;
  postalCode: string;
  city: string;
}

export interface BankInfoDto {
  iban: string;
  bicNumber: string;
}

export interface PersonalInfoDto {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
}

export interface CompanyInfoDto {
  companyName: string;
  vatNumber: string;
  subjectToVat: boolean;
}

export interface UserSettingsDto {
  personalInfo: PersonalInfoDto;
  companyInfo: CompanyInfoDto;
  address: AddressDto;
  bankInfo: BankInfoDto;
}
