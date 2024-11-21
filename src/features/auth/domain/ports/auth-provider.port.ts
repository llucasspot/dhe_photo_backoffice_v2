import { LoginBody } from '../login.body';
import { RegisterBody } from '../register.body';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export abstract class AuthProviderPort {
  abstract login(body: LoginBody): Promise<string>;

  abstract register(body: RegisterBody): Promise<string>;

  abstract logout(): Promise<void>;

  abstract getCurrentUser(): Promise<AuthUser | null>;

  abstract isAuthenticated(): boolean;
}
