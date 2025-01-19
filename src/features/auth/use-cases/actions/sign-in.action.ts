import { Action } from '#action/domain';
import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  AuthState,
  LoginBody,
} from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class SignInAction extends Action<AuthResponse, LoginBody> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {
    super({
      pending: 'auth.sign-in.pending',
      success: 'auth.sign-in.success',
      error: 'auth.sign-in.error',
    });
  }

  async execute(body: LoginBody) {
    const { accessToken, userId } = await this.authProvider.login(body);
    this.storageService.set(StorageService.currentUserId, userId);
    this.storageService.set(StorageService.currentAccessToken, accessToken);

    const photographer = await this.authProvider.getUserInfo();
    this.authState.set({ currentUser: photographer });
    return { accessToken, userId };
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign in:', error);
  }
}
