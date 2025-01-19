import { AuthState } from '../states';

import { inject, singleton } from '#di';
import { AuthProviderPort } from '#features/auth/domain';
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

  isAuthenticated(): boolean {
    return (
      this.storageService.get(StorageService.currentAccessToken) !== null &&
      this.storageService.get(StorageService.currentUserId) !== null
    );
  }

  async getUserInfo() {
    const photographer = await this.authProvider.getUserInfo();
    this.authState.set({ currentUser: photographer });
    return photographer;
  }
}
