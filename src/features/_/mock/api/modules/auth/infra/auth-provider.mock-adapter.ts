import { Finder } from '../../../../database/domain';
import { PhotographersDaoPort } from '../../../../database/modules/auth/domain/photographers-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { inject, singleton } from '#di';
import {
  AuthProviderPort,
  AuthResponse,
  AuthUser,
  LoginBody,
  RegisterBody,
} from '#features/auth/domain';

@singleton()
export class AuthProviderMockAdapter
  extends ForMockControllerService
  implements AuthProviderPort
{
  constructor(
    @inject(PhotographersDaoPort)
    private readonly photographersDao: PhotographersDaoPort,
  ) {
    super();
  }

  async getUserInfo(userId: string): Promise<AuthUser> {
    const photographer = await this.photographersDao.getById(userId);

    if (!photographer) {
      throw new Error('Invalid credentials');
    }

    return photographer;
  }

  async login({ email, password }: LoginBody): Promise<AuthResponse> {
    const photographer = await this.photographersDao.get(
      this.buildPhotographerFinderByEmail(email, password),
    );

    if (!photographer) {
      return this.register({ email, password, confirmPassword: password });
    }

    return {
      authToken: `mock_token_${photographer.id}`,
      userId: photographer.id,
    };
  }

  async register({ email, password }: RegisterBody): Promise<AuthResponse> {
    const photographer = await this.photographersDao.get(
      this.buildPhotographerFinderByEmail(email),
    );
    if (photographer) {
      throw new Error('User already exis');
    }

    const newPhotographer: AuthUser = await this.photographersDao.save({
      email,
      password,
    });

    return {
      authToken: `mock_token_${newPhotographer.id}`,
      userId: newPhotographer.id,
    };
  }

  async logout(): Promise<void> {}

  private buildPhotographerFinderByEmail(
    photographerEmail?: string,
    password?: string,
  ) {
    const finder = new Finder('photographers');
    if (photographerEmail) {
      finder.filtersWith(['email', '$equals', photographerEmail]);
    }
    if (password) {
      finder.filtersWith(['password', '$equals', password]);
    }
    return finder;
  }
}
