import { AuthState } from '../states';

import { inject, singleton } from '#di';
import {
  AuthProviderPort,
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
    const { authToken, userId } = await this.authProvider.login(body);
    const photographer = await this.authProvider.getUserInfo(userId);

    this.authState.set({ currentUser: photographer });
    this.storageService.set(StorageServicePort.currentAccessToken, authToken);
    this.storageService.set(StorageServicePort.currentUserId, userId);
  }

  async register(body: RegisterBody) {
    const { authToken, userId } = await this.authProvider.register(body);
    const photographer = await this.authProvider.getUserInfo(userId);

    this.authState.set({ currentUser: photographer });
    this.storageService.set(StorageServicePort.currentAccessToken, authToken);
    this.storageService.set(StorageServicePort.currentUserId, userId);
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
}
