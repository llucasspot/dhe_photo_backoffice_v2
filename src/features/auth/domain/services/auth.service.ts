import { AuthState } from '../states';

import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class AuthService {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {}

  async login(body: LoginBody) {
    await this.authenticateInApp(() => this.authProvider.login(body));
  }

  async register(body: RegisterBody) {
    await this.authenticateInApp(() => this.authProvider.register(body));
  }

  async logout() {
    await this.authProvider.logout();

    this.authState.set({ currentUser: null });
    this.storageService.remove(StorageService.currentAccessToken);
    this.storageService.remove(StorageService.currentUserId);
  }

  isAuthenticated(): boolean {
    return (
      this.storageService.get(StorageService.currentAccessToken) !== null &&
      this.storageService.get(StorageService.currentUserId) !== null
    );
  }

  async getUserInfo() {
    const userId = this.storageService.get(StorageService.currentUserId);
    if (!userId) {
      throw new Error('user not login');
    }
    const photographer = await this.authProvider.getUserInfo(userId);
    this.authState.set({ currentUser: photographer });
    return photographer;
  }

  private async authenticateInApp(cb: () => Promise<AuthResponse>) {
    const { accessToken, userId } = await cb();
    this.storageService.set(StorageService.currentUserId, userId);
    this.storageService.set(StorageService.currentAccessToken, accessToken);

    const photographer = await this.authProvider.getUserInfo(userId);
    this.authState.set({ currentUser: photographer });
  }
}
