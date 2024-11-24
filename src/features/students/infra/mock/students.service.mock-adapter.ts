import { StudentsMockDao } from './students.mock-dao';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateStudentBody,
  StudentDto,
  StudentsServicePort,
} from '#features/students/domain';

function generateUniqueCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

@singleton()
export class StudentsServiceMockAdapter
  extends MockAdapter
  implements StudentsServicePort
{
  private files: Record<string, File> = {};

  constructor(
    @inject(StudentsMockDao)
    private readonly studentsDao: StudentsMockDao,
  ) {
    super();
  }

  async getStudents(klassId: string): Promise<StudentDto[]> {
    await this.delay();
    return this.studentsDao
      .getAll()
      .filter((student) => student.klassId === klassId);
  }

  async getStudent(id: string): Promise<StudentDto> {
    await this.delay();
    const student = this.studentsDao.getById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async createStudent(body: CreateStudentBody): Promise<StudentDto> {
    await this.delay();
    const uploadedFiles = await this.uploadPhotos(body.photos);
    return this.studentsDao.save({
      ...body,
      code: generateUniqueCode(),
      photoIds: uploadedFiles,
    });
  }

  @LogAction()
  async createStudents(students: CreateStudentBody[]): Promise<StudentDto[]> {
    await this.delay();
    return Promise.all(students.map((student) => this.createStudent(student)));
  }

  async updateStudent(
    id: string,
    body: Partial<StudentDto>,
  ): Promise<StudentDto> {
    await this.delay();
    const student = this.studentsDao.update(id, body);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async deleteStudent(id: string): Promise<void> {
    await this.delay();
    const student = this.studentsDao.deleteById(id);
    if (!student) {
      throw new Error('Student not found');
    }
  }

  async uploadPhotos(files: File[]): Promise<string[]> {
    await this.delay();
    // Simulate file upload by generating random IDs
    const filesMap = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
    }));
    Array.from(filesMap.values()).forEach(({ id, file }) => {
      this.files[id] = file;
    });
    return Array.from(filesMap.values()).map((file) => file.id);
  }
}
