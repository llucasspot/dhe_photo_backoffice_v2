import {
  AddSchoolBankAccountBody,
  BankAccountDto,
  CreateSchoolBody,
  SchoolDto,
} from '../dtos';

export abstract class SchoolsControllerServicePort {
  // root

  abstract getSchools(): Promise<SchoolDto[]>;

  abstract createSchool(body: CreateSchoolBody): Promise<SchoolDto>;

  abstract getSchool(id: string): Promise<SchoolDto>;

  // detail

  abstract updateSchool(
    schoolId: string,
    body: Partial<SchoolDto>,
  ): Promise<SchoolDto>;

  abstract deleteSchool(id: string): Promise<void>;

  // bank accoounts

  abstract getBankAccounts(id: string): Promise<BankAccountDto[]>;

  abstract addBankAccount(
    id: string,
    body: AddSchoolBankAccountBody,
  ): Promise<BankAccountDto>;
}
