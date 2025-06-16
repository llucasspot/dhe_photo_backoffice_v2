import { inject, singleton } from '@mygoodstack/di-react/dist';

import { UserInfoGetter } from '../getter/user-info.getter';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import { AuthProviderPort } from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class SignOutAction extends Action {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(StorageService)
    private readonly storageService: StorageService,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
    @inject(UserInfoGetter)
    private readonly userInfoGetter: UserInfoGetter,
  ) {
    super({
      pending: 'auth.sign-out.pending',
      success: 'auth.sign-out.success',
      error: 'auth.sign-out.error',
    });
  }

  async execute() {
    await this.authProvider.logout();

    await this.cacheService.clean(this.userInfoGetter);
    this.storageService.remove(StorageService.currentAccessToken);
    this.storageService.remove(StorageService.currentUserId);
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign out user:', error);
  }
}
