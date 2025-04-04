import { HttpClient } from '../../../utils/http';

import { adapter, inject } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  AuthUser,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';

@adapter(AuthProviderPort)
export class AuthProviderApiAdapter implements AuthProviderPort {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {}

  async getUserInfo(): Promise<AuthUser> {
    const response = await this.httpClient.get<AuthUser>(`/user`);
    return response.data;
  }

  async login(body: LoginBody): Promise<AuthResponse> {
    const response = await this.httpClient.post<AuthResponse>(
      '/auth/signin',
      body,
    );
    return response.data;
  }

  async register(body: RegisterBody): Promise<AuthResponse> {
    const response = await this.httpClient.post<AuthResponse>(
      '/auth/signup',
      body,
    );
    return response.data;
  }

  async logout(): Promise<void> {}
}
