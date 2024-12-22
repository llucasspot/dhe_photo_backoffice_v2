import { AuthUser } from '#features/auth/domain';
import { StateValue } from '#state/domain';

export abstract class AuthState extends StateValue<{
  currentUser: AuthUser | null;
}> {}
