import { KlassDto } from '#features/klasses/domain';

export abstract class KlassStudentsServicePort {
  abstract getStudents(klassId: string): Promise<KlassDto['students']>;

  abstract getStudent(
    klassId: string,
    studentId: string,
  ): Promise<KlassDto['students'][0]>;
}
