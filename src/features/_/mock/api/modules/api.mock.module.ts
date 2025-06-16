import { Module } from '@mygoodstack/di-react';

import { DatabaseModule } from '../../database/modules/database.module';

import { AuthApiMockModule } from './auth/auth.api.mock.module';
import { KlassesMockApiModule } from './klasses/klasses.mock.api.module';
import { PicturesMockApiModule } from './pictures/pictures.mock.api.module';
import { ProductsMockApiModule } from './products/products.mock.api.module';
import { ProjectsMockApiModule } from './projects/projects.mock.api.module';
import { SchoolsMockApiModule } from './schools/schools.mock.api.module';
import { StudentsMockApiModule } from './students/students.mock.api.module';

@Module({
  providers: [
    DatabaseModule,
    AuthApiMockModule,
    KlassesMockApiModule,
    PicturesMockApiModule,
    ProductsMockApiModule,
    ProjectsMockApiModule,
    SchoolsMockApiModule,
    StudentsMockApiModule,
  ],
})
export class ApiMockModule {}
