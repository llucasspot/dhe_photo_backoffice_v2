import { AuthState } from '../states';

import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';
import { StorageServicePort } from '#storage/domain';

@singleton()
export class AuthService {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageServicePort)
    private readonly storageService: StorageServicePort,
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
    this.storageService.remove(StorageServicePort.currentAccessToken);
    this.storageService.remove(StorageServicePort.currentUserId);
  }

  isAuthenticated(): boolean {
    return (
      this.storageService.get(StorageServicePort.currentAccessToken) !== null &&
      this.storageService.get(StorageServicePort.currentUserId) !== null
    );
  }

  async getUserInfo() {
    const userId = this.storageService.get(StorageServicePort.currentUserId);
    if (!userId) {
      throw new Error('user not login');
    }
    const photographer = await this.authProvider.getUserInfo(userId);
    this.authState.set({ currentUser: photographer });
    return photographer;
  }

  private async authenticateInApp(cb: () => Promise<AuthResponse>) {
    const { accessToken, userId } = await cb();
    this.storageService.set(StorageServicePort.currentUserId, userId);
    this.storageService.set(StorageServicePort.currentAccessToken, accessToken);

    const photographer = await this.authProvider.getUserInfo(userId);
    this.authState.set({ currentUser: photographer });
  }
}
