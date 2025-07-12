import {
  AddSchoolBankAccountBody,
  CreateSchoolBody,
  SchoolBankAccountDto,
  SchoolDto,
} from '../dtos';

export abstract class SchoolsControllerServicePort {
  abstract getAll(): Promise<SchoolDto[]>;
  abstract geOne(): Promise<SchoolDto>;
  abstract createOne(body: CreateSchoolBody): Promise<SchoolDto>;

  abstract getSchool(id: string): Promise<SchoolDto>;

  // detail

  abstract updateSchool(
    schoolId: string,
    body: Partial<SchoolDto>,
  ): Promise<SchoolDto>;

  abstract deleteSchool(id: string): Promise<void>;

  // bank accoounts

  abstract getBankAccounts(id: string): Promise<SchoolBankAccountDto[]>;

  abstract addBankAccount(
    id: string,
    body: AddSchoolBankAccountBody,
  ): Promise<SchoolBankAccountDto>;
}
