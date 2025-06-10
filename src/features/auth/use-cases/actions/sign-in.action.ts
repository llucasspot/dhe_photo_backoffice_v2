import { AuthenticateAction } from './authenticate.action';

import { Action } from '#action/domain';
import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  LoginBody,
} from '#features/auth/domain';

@singleton()
export class SignInAction extends Action<AuthResponse, LoginBody> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthenticateAction)
    private readonly authenticateAction: AuthenticateAction,
  ) {
    super({
      pending: 'auth.sign-in.pending',
      success: 'auth.sign-in.success',
      error: 'auth.sign-in.error',
    });
  }

  async execute(body: LoginBody) {
    const authResponse = await this.authProvider.login(body);
    return this.authenticateAction.execute(authResponse);
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign in:', error);
  }
}
