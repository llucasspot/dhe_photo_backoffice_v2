import { Module } from '@mygoodstack/di-react';

import { FileStudentsServiceMockAdapter } from './infra/file-students.service.mock-adapter';
import { FilesServiceMockAdapter } from './infra/files.service.mock-adapter';
import { GroupPicturesServiceMockAdapter } from './infra/group-pictures.service.mock-adapter';
import { PictureControllerServiceDexieAdapter } from './infra/picture.controller-service.dexie-adapter';

@Module({
  providers: [
    GroupPicturesServiceMockAdapter,
    FileStudentsServiceMockAdapter,
    FilesServiceMockAdapter,
    PictureControllerServiceDexieAdapter,
  ],
})
export class PicturesMockApiModule {}
