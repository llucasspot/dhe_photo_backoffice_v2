import { inject, singleton } from '@mygoodstack/di-react/dist';

import { Getter } from '#action/domain';
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
