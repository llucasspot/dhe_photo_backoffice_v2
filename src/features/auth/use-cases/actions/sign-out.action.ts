import { Action } from '#action/domain';
import { inject, singleton } from '#di';
import { AuthProviderPort, AuthState } from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class SignOutAction extends Action {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {
    super({
      pending: 'auth.sign-out.pending',
      success: 'auth.sign-out.success',
      error: 'auth.sign-out.error',
    });
  }

  async execute() {
    await this.authProvider.logout();

    this.authState.set({ currentUser: null });
    this.storageService.remove(StorageService.currentAccessToken);
    this.storageService.remove(StorageService.currentUserId);
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign out user:', error);
  }
}
