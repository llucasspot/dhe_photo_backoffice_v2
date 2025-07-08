import {
  BankAccountDto,
  CreateSchoolBody,
  SchoolDto,
  SchoolsControllerServicePort,
} from '@domain/schools';
import { AddSchoolBankAccountBody } from '@domain/schools';
import { adapter, inject } from '@mygoodstack/di-react';

import { HttpClient } from '../../../utils/http';

@adapter(SchoolsControllerServicePort)
export class SchoolsServiceApiAdapter implements SchoolsControllerServicePort {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {}

  // root

  async getSchools(): Promise<SchoolDto[]> {
    const response = await this.httpClient.get<SchoolDto[]>('/user/schools');
    return response.data;
  }

  async createSchool(body: CreateSchoolBody): Promise<SchoolDto> {
    const response = await this.httpClient.post<SchoolDto>(
      `/user/schools`,
      body,
    );
    return response.data;
  }

  // detail

  async getSchool(id: string): Promise<SchoolDto> {
    const response = await this.httpClient.get<SchoolDto>(
      `/user/schools/${id}`,
    );
    return response.data;
  }

  async updateSchool(id: string, body: Partial<SchoolDto>): Promise<SchoolDto> {
    const response = await this.httpClient.patch<SchoolDto>(
      `/user/schools/${id}`,
      body,
    );
    return response.data;
  }

  async deleteSchool(id: string): Promise<void> {
    const response = await this.httpClient.delete<void>(`/user/schools/${id}`);
    return response.data;
  }

  // bank accounts

  async getBankAccounts(id: string): Promise<BankAccountDto[]> {
    const response = await this.httpClient.get<BankAccountDto[]>(
      `/user/schools/${id}/bank-accounts`,
    );
    return response.data;
  }

  async addBankAccount(
    id: string,
    body: AddSchoolBankAccountBody,
  ): Promise<BankAccountDto> {
    const response = await this.httpClient.post<BankAccountDto>(
      `/user/schools/${id}/bank-accounts`,
      body,
    );
    return response.data;
  }
}
