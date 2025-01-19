import { Action } from '#action/domain';
import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  AuthState,
  RegisterBody,
} from '#features/auth/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class SignUpAction extends Action<AuthResponse, RegisterBody> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthState)
    private readonly authState: AuthState,
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {
    super({
      pending: 'auth.sign-up.pending',
      success: 'auth.sign-up.success',
      error: 'auth.sign-up.error',
    });
  }

  async execute(body: RegisterBody) {
    const { accessToken, userId } = await this.authProvider.register(body);
    this.storageService.set(StorageService.currentUserId, userId);
    this.storageService.set(StorageService.currentAccessToken, accessToken);

    const photographer = await this.authProvider.getUserInfo();
    this.authState.set({ currentUser: photographer });
    return { accessToken, userId };
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign up user:', error);
  }
}
