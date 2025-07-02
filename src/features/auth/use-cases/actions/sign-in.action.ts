import { inject, singleton } from '@mygoodstack/di-react';

import { AuthenticateAction } from './authenticate.action';

import { Action } from '#action/domain';
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
    super();
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
