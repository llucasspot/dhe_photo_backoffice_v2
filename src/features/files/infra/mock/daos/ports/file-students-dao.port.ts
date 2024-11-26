import { FileStudentDto } from '#features/files/domain';
import { Dao } from '#mock';

export type FileStudent = Pick<FileStudentDto, 'id' | 'studentId' | 'fileId'>;

export abstract class FileStudentsDaoPort extends Dao<'studentFiles'> {}
