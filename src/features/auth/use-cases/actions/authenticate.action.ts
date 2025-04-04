import { Action } from '#action/domain';
import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  AuthState,
} from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class AuthenticateAction extends Action<AuthResponse, AuthResponse> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {
    super({
      pending: 'auth.authenticate.pending',
      success: 'auth.authenticate.success',
      error: 'auth.authenticate.error',
    });
  }

  async execute(authResponse: AuthResponse) {
    this.storageService.set(StorageService.currentUserId, authResponse.userId);
    this.storageService.set(
      StorageService.currentAccessToken,
      authResponse.accessToken,
    );
    this.storageService.set(
      StorageService.currentRefreshToken,
      authResponse.refreshToken,
    );

    const photographer = await this.authProvider.getUserInfo();
    this.authState.set({ currentUser: photographer });
    return authResponse;
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign up user:', error);
  }
}
