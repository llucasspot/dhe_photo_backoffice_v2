import { inject, singleton } from '@mygoodstack/di-react';

import { AuthenticateAction } from './authenticate.action';

import { Action } from '#action/domain';
import {
  AuthProviderPort,
  AuthResponse,
  RegisterBody,
} from '#features/auth/domain';

@singleton()
export class SignUpAction extends Action<AuthResponse, RegisterBody> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
    @inject(AuthenticateAction)
    private readonly authenticateAction: AuthenticateAction,
  ) {
    super();
  }

  async execute(body: RegisterBody) {
    const authResponse = await this.authProvider.register(body);
    return this.authenticateAction.execute(authResponse);
  }

  onSuccess(): void {}

  onError(error: Error): void {
    console.error('Failed to sign up user:', error);
  }
}
