import { LoginDto, RegisterDto } from '../auth.dto';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export abstract class AuthProviderPort {
  abstract login(body: LoginDto): Promise<string>;
  abstract register(body: RegisterDto): Promise<string>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<AuthUser | null>;
  abstract isAuthenticated(): boolean;
}
