import { AuthUser } from '#features/auth/domain';
import { StateValue } from '#state';

export abstract class AuthState extends StateValue<{
  currentUser: AuthUser | null;
}> {}
