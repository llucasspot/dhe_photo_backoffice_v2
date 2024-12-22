import { KlassesDatabaseModule } from './klasses/klasses.database.module';
import { PicturesDatabaseModule } from './pictures/pictures.database.module';
import { ProductsDatabaseModule } from './products/products.database.module';
import { ProjectsDatabaseModule } from './projects/projects.database.module';
import { SchoolsDatabaseModule } from './schools/schools.database.module';
import { StudentsDatabaseModule } from './students/students.database.module';
import { TemplatesDexieModule } from './templates/infra/dexie/templates.dexie.module';

import { Module } from '#di';

@Module({
  imports: [
    KlassesDatabaseModule,
    PicturesDatabaseModule,
    ProductsDatabaseModule,
    ProjectsDatabaseModule,
    SchoolsDatabaseModule,
    StudentsDatabaseModule,
    TemplatesDexieModule,
  ],
})
export class DatabaseModule {}
