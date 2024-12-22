import { AuthState } from '../states';

import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';

@singleton()
export class AuthService {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
  ) {}

  async login(body: LoginBody) {
    const { authToken, userId } = await this.authProvider.login(body);
    const photographer = await this.authProvider.getUserInfo(userId);

    this.authState.set({ currentUser: photographer });
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('auth_user_id', userId);
  }

  async register(body: RegisterBody) {
    const { authToken, userId } = await this.authProvider.register(body);
    const photographer = await this.authProvider.getUserInfo(userId);

    this.authState.set({ currentUser: photographer });
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('auth_user_id', userId);
  }

  async logout() {
    await this.authProvider.logout();

    this.authState.set({ currentUser: null });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user_id');
  }

  isAuthenticated(): boolean {
    return (
      localStorage.getItem('auth_token') !== null &&
      localStorage.getItem('auth_user_id') !== null
    );
  }
}
