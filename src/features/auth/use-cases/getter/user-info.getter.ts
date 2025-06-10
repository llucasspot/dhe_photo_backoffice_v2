import { Getter } from '#action/domain';
import { inject, singleton } from '#di';
import { AuthProviderPort, AuthUser } from '#features/auth/domain';

@singleton()
export class UserInfoGetter extends Getter<['user'], AuthUser, []> {
  constructor(
    @inject(AuthProviderPort)
    private readonly authProvider: AuthProviderPort,
  ) {
    super(() => ['user']);
  }

  async get() {
    return this.authProvider.getUserInfo();
  }
}
