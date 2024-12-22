import { singleton } from '#di';
import {
  AuthProviderPort,
  AuthUser,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';

@singleton()
export class AuthProviderMockAdapter extends AuthProviderPort {
  private mockUsers: AuthUser[] = [
    {
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  ];

  private currentUser: AuthUser | null = null;
  private authToken: string | null = null;

  async login({ email }: LoginBody): Promise<string> {
    const user = this.mockUsers.find((u) => u.email === email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.currentUser = user;
    this.authToken = `mock_token_${user.id}`;
    localStorage.setItem('auth_token', this.authToken);

    return this.authToken;
  }

  async register({ email }: RegisterBody): Promise<string> {
    if (this.mockUsers.some((u) => u.email === email)) {
      throw new Error('User already exis');
    }

    const newUser: AuthUser = {
      id: (this.mockUsers.length + 1).toString(),
      email,
    };

    this.mockUsers.push(newUser);
    this.currentUser = newUser;
    this.authToken = `mock_token_${newUser.id}`;
    localStorage.setItem('auth_token', this.authToken);

    return this.authToken;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
}
