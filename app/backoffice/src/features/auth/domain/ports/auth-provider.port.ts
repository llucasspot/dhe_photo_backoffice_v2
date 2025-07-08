import { LoginBody, RegisterBody } from '../dtos';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  userId: string;
  accessToken: string;
  refreshToken?: string;
}

export abstract class AuthProviderPort {
  abstract getUserInfo(): Promise<AuthUser>;

  abstract login(body: LoginBody): Promise<AuthResponse>;

  abstract register(body: RegisterBody): Promise<AuthResponse>;

  abstract logout(): Promise<void>;
}
