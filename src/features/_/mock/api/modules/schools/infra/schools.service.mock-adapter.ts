import { adapter, inject } from '@mygoodstack/di-react';

import { AddSchoolBankAccountBody } from '../../../../../../schools/domain/dtos/bodies/add-school-bank-account.body';
import { Finder, Populator } from '../../../../database/domain';
import { BankAccountsDaoPort } from '../../../../database/modules/schools/domain/bank-accounts-dao.port';
import { SchoolBankAccountsDaoPort } from '../../../../database/modules/schools/domain/school-bank-accounts-dao.port';
import { SchoolsDaoPort } from '../../../../database/modules/schools/domain/schools-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import {
  BankAccountDto,
  CreateSchoolBody,
  SchoolDto,
  SchoolsControllerServicePort,
} from '#features/schools/domain';

@adapter(SchoolsControllerServicePort, 'mock')
export class SchoolsServiceMockAdapter
  extends ForMockControllerService
  implements SchoolsControllerServicePort
{
  constructor(
    @inject(SchoolsDaoPort)
    private readonly schoolsDao: SchoolsDaoPort,
    @inject(SchoolBankAccountsDaoPort)
    private readonly schoolBankAccountsDao: SchoolBankAccountsDaoPort,
    @inject(BankAccountsDaoPort)
    private readonly bankAccountsDaoPort: BankAccountsDaoPort,
  ) {
    super();
  }

  // root

  @LogAction()
  async getSchools(): Promise<SchoolDto[]> {
    await this.delay();
    const finder = this.buildFinder();
    const schools = await this.schoolsDao.getAll(finder);
    for (const school of schools) {
      // @ts-expect-error lala
      school['bankAccounts'] = school.schoolBankAccounts.map(
        (schoolBankAccount) => schoolBankAccount.bankAccounts,
      );
    }
    return SchoolDto.build(schools);
  }

  @LogAction()
  async getSchool(id: string): Promise<SchoolDto> {
    await this.delay();
    const finder = this.buildFinder(id);
    const school = await this.schoolsDao.get(finder);
    if (!school) {
      throw new HttpError(404, 'School not found');
    }
    console.log('[SchoolsServiceMockAdapter] [getSchool] [school] ', school);
    // @ts-expect-error lala
    school['bankAccounts'] = school.schoolBankAccounts.map(
      (schoolBankAccount) => schoolBankAccount.bankAccounts,
    );
    return SchoolDto.build(school);
  }

  @LogAction()
  async createSchool(body: CreateSchoolBody): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.save({
      ...body,
    });
    return this.getSchool(school.id);
  }

  // detail

  @LogAction()
  async updateSchool(
    schoolId: string,
    body: Partial<SchoolDto>,
  ): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.update(schoolId, body);
    if (!school) {
      throw new HttpError(404, 'School not found');
    }
    return this.getSchool(school.id);
  }

  @LogAction()
  async deleteSchool(id: string): Promise<void> {
    await this.delay();
    const school = this.schoolsDao.deleteById(id);
    if (!school) {
      throw new HttpError(404, 'School not found');
    }
  }

  // bank accounts

  async addBankAccount(
    id: string,
    body: AddSchoolBankAccountBody,
  ): Promise<BankAccountDto> {
    await this.delay();
    // const body: AddSchoolBankAccountBody = {
    //   iban: 'FR7630001007941234567890185',
    //   bic: 'SOGEFRPP',
    // };
    const bankAccount = await this.bankAccountsDaoPort.save(body);
    await this.schoolBankAccountsDao.save({
      schoolId: id,
      bankAccountId: bankAccount.id,
    });
    return bankAccount;
  }

  async getBankAccounts(id: string): Promise<BankAccountDto[]> {
    await this.delay();
    const schoolBankAccounts = await this.schoolBankAccountsDao.getAll(
      new Finder('schoolBankAccounts').filtersWith(['schoolId', '$equals', id]),
    );
    return await this.bankAccountsDaoPort.getAll(
      new Finder('bankAccounts').filtersWith([
        'id',
        '$in',
        schoolBankAccounts.map((sba) => sba.bankAccountId),
      ]),
    );
  }

  private buildFinder(schoolId?: string) {
    const finder = new Finder('schools')
      .populateManyWith(
        'schoolId',
        Populator.builder('projects', 'projects')
          .populateManyWith(
            'projectId',
            Populator.builder('klasses', 'klasses')
              .populateManyWith(
                'klassId',
                Populator.builder('photos', 'groupPictures')
                  .populateWith(
                    'pictureId',
                    Populator.builder('picture', 'pictures').build(),
                  )
                  .build(),
              )
              .populateManyWith(
                'klassId',
                Populator.builder('students', 'students')
                  .populateManyWith(
                    'studentId',
                    Populator.builder('photos', 'studentPictures')
                      .populateWith(
                        'pictureId',
                        Populator.builder('picture', 'pictures').build(),
                      )
                      .build(),
                  )
                  .build(),
              )
              .build(),
          )
          .build(),
      )
      .populateManyWith(
        'schoolId',
        Populator.builder('schoolBankAccounts', 'schoolBankAccounts')
          .populateWith(
            'bankAccountId',
            Populator.builder('bankAccounts', 'bankAccounts').build(),
          )
          .build(),
      );
    if (schoolId) {
      finder.filtersWith(['id', '$equals', schoolId]);
    }
    return finder;
  }
}
