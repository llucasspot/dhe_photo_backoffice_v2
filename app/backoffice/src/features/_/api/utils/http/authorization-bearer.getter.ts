import { inject, singleton } from '@mygoodstack/di-react';

import { LocalGetter } from '#action/domain';
import { StorageService } from '#storage/domain';

@singleton()
export class AuthorizationBearerGetter extends LocalGetter<
  | `Bearer ${string}`
  | `Basic ${string}`
  | Promise<`Bearer ${string}`>
  | Promise<`Basic ${string}`>
> {
  constructor(
    @inject(StorageService)
    private readonly storageService: StorageService,
  ) {
    super();
  }

  get():
    | `Bearer ${string}`
    | `Basic ${string}`
    | Promise<`Bearer ${string}`>
    | Promise<`Basic ${string}`>
    | Promise<
        | `Bearer ${string}`
        | `Basic ${string}`
        | Promise<`Bearer ${string}`>
        | Promise<`Basic ${string}`>
      > {
    const accessToken = this.storageService.get(
      StorageService.currentAccessToken,
    );
    return `Bearer ${accessToken}`;
  }
}
